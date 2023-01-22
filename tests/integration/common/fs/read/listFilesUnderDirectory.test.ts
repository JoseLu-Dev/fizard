import { ListFilesUnderDirectory } from "../../../../../src/common/data/fs/read/listFilesUnderDirectory"
const withLocalTmpDir = require('with-local-tmp-dir')
const outputFiles = require('output-files')

const listFiles: ListFilesUnderDirectory = new ListFilesUnderDirectory()

describe('list', () => {

    it('list files and folders in a directory', () => withLocalTmpDir(async () => {
        await outputFiles({
            '.config.json': '',
            'folder':{},
            'README.md': '',
        })

        const fileNames = await listFiles.list(process.cwd())

        expect(fileNames).toContain('README.md')
        expect(fileNames).toContain('folder')
        expect(fileNames).toContain('.config.json')
    }))

})