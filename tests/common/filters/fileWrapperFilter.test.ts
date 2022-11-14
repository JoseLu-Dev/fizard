import { FileWrapperFilter } from "../../../src/common/filters/fileWrapperFilter"
import { FileWrapper } from "../../../src/common/fileWrapper"

const fileWrapperFilter = new FileWrapperFilter()

describe('removeDirs', () => {

    it('returns a list of files without folders', async () => {

        const files: Array<FileWrapper> = [
            {
                stats: { isDirectory: () => false }
            },
            {
                stats: { isDirectory: () => false }
            },
            {
                stats: { isDirectory: () => true }
            },
        ] as Array<FileWrapper>

        const filesFiltered = fileWrapperFilter.removeDirs(files)

        expect(filesFiltered).toHaveLength(2)
    })

})
