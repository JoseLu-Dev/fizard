import { CalculateFileHash } from "../../../../../src/command/findDuplicates/data/calculateFileHash"
const withLocalTmpDir = require('with-local-tmp-dir')
const outputFiles = require('output-files')

const listFiles: CalculateFileHash = new CalculateFileHash()

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

    it('checksum is the same if two files have the same content', () => withLocalTmpDir(async () => {
        await outputFiles({
            'README.md': '',
            'README.txt': '',
        })

        const checksumMD = listFiles.calculate('README.md')
        const checksumTXT = listFiles.calculate('README.txt')

        expect(checksumMD).toEqual(checksumTXT)
    }))

    it('checksum is different is two files have different content', () => withLocalTmpDir(async () => {
        await outputFiles({
            'README.md': '',
            'README.txt': 'a',
        })

        const checksumMD = listFiles.calculate('README.md')
        const checksumTXT = listFiles.calculate('README.txt')

        expect(checksumMD).not.toEqual(checksumTXT)
    }))

})