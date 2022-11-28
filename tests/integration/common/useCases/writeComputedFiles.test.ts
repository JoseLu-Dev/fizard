import 'reflect-metadata'

const withLocalTmpDir = require('with-local-tmp-dir')
const outputFiles = require('output-files')
const dirTree = require("directory-tree");
import { Container } from 'typedi'
import { FileWrapper } from '../../../../src/common/fileWrapper'

import { WriteComputedFilesUseCase } from '../../../../src/common/useCases/writeComputedFilesUseCase'

const writeComputedFiles: WriteComputedFilesUseCase = Container.get(WriteComputedFilesUseCase)

const folderStructure = {
    'video.mp4': '',
}

describe('write', () => {

    it('modifies or creates folder and file structure', () => withLocalTmpDir(async () => {
        await outputFiles(folderStructure)

        const files: FileWrapper[] = [
            {
                pathCurrentComplete: () => `${process.cwd()}\\video.mp4`,
                pathNewComplete: () => `${process.cwd()}\\videos\\video.mp4`
            },
            {
                pathNewComplete: () => `${process.cwd()}\\newFile.file`,
                isNew: true,
                stats: {
                    isFile: () => true
                }
            },
            {
                pathNewComplete: () => `${process.cwd()}\\newFolder`,
                isNew: true,
                stats: {
                    isDirectory: () => true,
                    isFile: () => false,
                }
            }
        ] as FileWrapper[]
        
        
        await writeComputedFiles.write(files)
        

        const tree = dirTree(process.cwd(), {attributes: ['type']});

        const treeFiles = tree.children

        const fileMoved = treeFiles.filter(c => c.name === 'videos')[0].children[0]
        expect(fileMoved.name).toBe('video.mp4')

        const fileCreated = treeFiles.filter(c => c.name === 'newFile.file')[0]
        expect(fileCreated.name).toBe('newFile.file')
        expect(fileCreated.type).toBe('file')

        const folderCreated = treeFiles.filter(c => c.name === 'newFolder')[0]
        expect(folderCreated.name).toBe('newFolder')
        expect(folderCreated.type).toBe('directory')
    }))

})