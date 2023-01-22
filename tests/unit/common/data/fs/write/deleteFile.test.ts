const deleteFileMock = jest.fn()
jest.mock('fs/promises', () => ({
    unlink: deleteFileMock
}))

jest.mock('../../../../../../src/common/cli.ts')

import { DeleteFile } from '../../../../../../src/common/data/fs/write/deleteFile';
const deleteFile: DeleteFile = new DeleteFile()

describe('create', () => {
    
    it('calls unlink method with given dir path', async () => {
        
        await deleteFile.delete('C:\\temp\\image')

        expect(deleteFileMock).toHaveBeenCalledWith('C:\\temp\\image')
    })

    it('catches error thrown in unlink function', async () => {

        deleteFileMock.mockImplementation(() => { throw new Error() })

        await deleteFile.delete('')
    })

})
