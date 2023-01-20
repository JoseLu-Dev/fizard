const readdirMock = jest.fn()
jest.mock('fs/promises', () => ({
    readdir: readdirMock
}))

jest.mock('../../../../../../src/common/cli.ts')

import { ListFilesUnderDirectory } from '../../../../../../src/common/data/fs/read/listFilesUnderDirectory';
const listFiles: ListFilesUnderDirectory = new ListFilesUnderDirectory()

describe('list', () => {

    it('returns a list of files in a path', async () => {

        const fileNames = ['cache', 'test.test']
        const dir = 'C:\\\\temp\\data'

        readdirMock.mockReturnValue(fileNames)

        const fileNamesInDir = await listFiles.list(dir)

        expect(fileNamesInDir).toBe(fileNames)
    })

    it('catches error thrown in readdir function', async () => {

        readdirMock.mockImplementation(() => { throw new Error() })

        const fileNamesInDir = await listFiles.list('')

        expect(fileNamesInDir).toHaveLength(0)
    })

})
