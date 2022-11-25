import { ListFilesUnderDirectory } from "../../../../../src/common/fs/read/listFilesUnderDirectory"
const withLocalTmpDir = require('with-local-tmp-dir')
const outputFiles = require('output-files')

const listFiles: ListFilesUnderDirectory = new ListFilesUnderDirectory()

describe('list', () => {

    it('list files and folders in a directory', () => withLocalTmpDir(async () => {
        await outputFiles({
            '.configrc.json': '',
            'folder':{},
            'README.md': '',
        })

        const fileNames = await listFiles.list(process.cwd())

        expect(fileNames[0]).toBe('.configrc.json')
        expect(fileNames[1]).toBe('folder')
        expect(fileNames[2]).toBe('README.md')
    }))

})