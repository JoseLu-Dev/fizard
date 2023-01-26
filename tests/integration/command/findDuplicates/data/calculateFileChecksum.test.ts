import { CalculateFileChecksum } from "../../../../../src/command/findDuplicates/data/calculateFileChecksum"
const withLocalTmpDir = require('with-local-tmp-dir')
const outputFiles = require('output-files')

const listFiles: CalculateFileChecksum = new CalculateFileChecksum()

describe('calculate', () => {

    it('calculates checksum of a file', () => withLocalTmpDir(async () => {
        await outputFiles({
            'README.md': '',
        })

        const checksum = listFiles.calculate('README.md')

        expect(checksum).toBeDefined()
        expect(typeof checksum).toBe(typeof '')
        expect(checksum).not.toHaveLength(0)
        console.log(checksum)
    }))

})