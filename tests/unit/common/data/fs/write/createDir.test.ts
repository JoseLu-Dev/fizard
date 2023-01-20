const ensureDirMock = jest.fn()
jest.mock('fs-extra', () => ({
    ensureDir: ensureDirMock
}))

jest.mock('../../../../../../src/common/cli.ts')

import { CreateDir } from '../../../../../../src/common/data/fs/write/createDir';
const createDir: CreateDir = new CreateDir()

describe('create', () => {
    
    it('calls ensureDir method with given dir path', async () => {
        
        await createDir.create('C:\\temp\\image')

        expect(ensureDirMock).toHaveBeenCalledWith('C:\\temp\\image')
    })

    it('catches error thrown in ensureDir function', async () => {

        ensureDirMock.mockImplementation(() => { throw new Error() })

        await createDir.create('')
    })

})
