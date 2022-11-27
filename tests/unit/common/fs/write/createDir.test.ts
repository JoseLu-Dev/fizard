const ensureDirMock = jest.fn()
jest.mock('fs-extra', () => ({
    ensureDir: ensureDirMock
}))

import { CreateDir } from "../../../../../src/common/fs/write/createDir"
const createDir: CreateDir = new CreateDir()

describe('create', () => {
    
    it('calls ensureDir method with given dir path', async () => {
        
        await createDir.create('C:\\temp\\image')

        expect(ensureDirMock).toHaveBeenCalledWith('C:\\temp\\image')
    })

})
