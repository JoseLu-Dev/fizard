import { FileWrapperFilter } from '../../../../../src/common/business/filters/fileWrapperFilter';
import { FileWrapper } from '../../../../../src/common/business/fileWrapper';


const fileWrapperFilter = new FileWrapperFilter()

describe('removeDirs', () => {

    it('returns a list of FileWrapper without folders', async () => {

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

describe('removeFiles', () => {

    it('returns a list of FileWrapper without files', async () => {

        const files: Array<FileWrapper> = [
            {
                stats: { isFile: () => false }
            },
            {
                stats: { isFile: () => false }
            },
            {
                stats: { isFile: () => true }
            },
        ] as Array<FileWrapper>

        const filesFiltered = fileWrapperFilter.removeFiles(files)

        expect(filesFiltered).toHaveLength(2)
    })

})
