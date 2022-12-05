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

describe('removeFiles of pathCurrent', () => {

    it('returns a list of FileWrapper without files', async () => {

        const files: Array<FileWrapper> = [
            {
                pathCurrent: '/folder/videos',
                stats: { isFile: () => false }
            },
            {
                pathCurrent: '/folder',
                stats: { isFile: () => false }
            },
            {
                pathCurrent: '/folder/videos',
                stats: { isFile: () => true }
            },
            {
                pathCurrent: '/folder/text',
                stats: { isFile: () => true }
            },
            {
                pathCurrent: '/folder',
                stats: { isFile: () => true }
            },
            {
                pathCurrent: '/folder',
                stats: { isFile: () => true }
            },
        ] as Array<FileWrapper>

        const filesFiltered = fileWrapperFilter.removeFilesOfPath(files, '/folder')

        expect(filesFiltered).toHaveLength(4)

        filesFiltered.forEach(f=>{
            if(f.stats?.isFile())
                expect(f.pathCurrent).not.toBe('/folder')
        })
    })

})
