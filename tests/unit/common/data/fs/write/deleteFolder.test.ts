const rmdirMock = jest.fn()
jest.mock('fs/promises', () => ({
    rmdir: rmdirMock
}))

import { DeleteFolder } from '../../../../../../src/common/data/fs/write/deleteFolder';
const deleteFolder: DeleteFolder = new DeleteFolder()

describe('create', () => {
    
    it('calls ensureDir method with given dir path', async () => {
        
        await deleteFolder.delete('C:\\temp\\image')

        expect(rmdirMock).toHaveBeenCalledWith('C:\\temp\\image')
    })

})
