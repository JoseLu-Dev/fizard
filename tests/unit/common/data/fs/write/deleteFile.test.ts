const deleteFileMock = jest.fn()
jest.mock('fs/promises', () => ({
    unlink: deleteFileMock
}))

import { DeleteFile } from '../../../../../../src/common/data/fs/write/deleteFile';
const deleteFile: DeleteFile = new DeleteFile()

describe('create', () => {
    
    it('calls ensureDir method with given dir path', async () => {
        
        await deleteFile.delete('C:\\temp\\image')

        expect(deleteFileMock).toHaveBeenCalledWith('C:\\temp\\image')
    })

})
