const rmdirMock = jest.fn()
jest.mock('fs/promises', () => ({
    rmdir: rmdirMock
}))

jest.mock('../../../../../../src/common/cli.ts')

import { DeleteFolder } from '../../../../../../src/common/data/fs/write/deleteFolder';
const deleteFolder: DeleteFolder = new DeleteFolder()

describe('create', () => {
    
    it('calls rmdir method with given dir path', async () => {
        
        await deleteFolder.delete('C:\\temp\\image')

        expect(rmdirMock).toHaveBeenCalledWith('C:\\temp\\image')
    })

    it('catches error thrown in rmdir function', async () => {

        rmdirMock.mockImplementation(() => { throw new Error() })

        await deleteFolder.delete('')
    })
})
