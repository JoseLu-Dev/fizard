const readdirMock = jest.fn()
jest.mock('fs/promises', () => ({
    readdir: readdirMock
}))

import { ListFilesUnderDirectory } from '../../../../../../src/common/data/fs/read/listFilesUnderDirectory';
const listFiles: ListFilesUnderDirectory = new ListFilesUnderDirectory()

describe('list', () => {
    
    it('adds path to given readdir array of filenames', async () => {
        const fileNames = ['cache', 'test.test']
        const dir = 'C:\\\\temp\\data'

        readdirMock.mockReturnValue(fileNames)
        
        const fileNamesAbsolutePath = await listFiles.list(dir)

        expect(fileNamesAbsolutePath).toBeInstanceOf(Array<string>)
        expect(fileNamesAbsolutePath).toHaveLength(fileNames.length)

        for (let index = 0; index < fileNamesAbsolutePath.length; index++) {
            expect(fileNamesAbsolutePath[index]).toBe(fileNames[index])
        }
    })

})
