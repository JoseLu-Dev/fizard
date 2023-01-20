const ensureFileMock = jest.fn()
jest.mock('fs-extra', () => ({
    ensureFile: ensureFileMock
}))

jest.mock('../../../../../../src/common/cli.ts')

import { CreateFile } from '../../../../../../src/common/data/fs/write/createFile';
const createFile: CreateFile = new CreateFile()

describe('create', () => {
    
    it('calls ensureFile method with given dir path', async () => {
        
        await createFile.create('C:\\temp\\image.jpg')

        expect(ensureFileMock).toHaveBeenCalledWith('C:\\temp\\image.jpg')
    })

    it('catches error thrown in ensureFile function', async () => {

        ensureFileMock.mockImplementation(() => { throw new Error() })

        await createFile.create('')
    })
})
