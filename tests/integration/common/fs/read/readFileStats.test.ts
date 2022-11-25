import { ReadFileStats } from "../../../../../src/common/fs/read/readFileStats"
const withLocalTmpDir = require('with-local-tmp-dir')
const outputFiles = require('output-files')

const readFileStats: ReadFileStats = new ReadFileStats()

describe('list', () => {
    
    it('return a stats object of the file', () => withLocalTmpDir(async () => {
        await outputFiles({
            'folder':{}
        })

        const stats = await readFileStats.read('folder')

        expect(stats).not.toBeNull()
        expect(stats.size).toBeDefined()
        expect(stats.mtime).toBeDefined()
        expect(stats.birthtime).toBeDefined()
        expect(stats.blksize).toBeDefined()
    }))

})
