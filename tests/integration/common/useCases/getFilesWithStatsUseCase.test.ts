import 'reflect-metadata'

const withLocalTmpDir = require('with-local-tmp-dir')
const outputFiles = require('output-files')
import { Container } from 'typedi'
import * as fs from 'fs/promises';

import { GetFilesWithStatsUseCase } from '../../../../src/common/business/useCases/getFilesWithStatsUseCase'

const getFilesWithStatsUseCase: GetFilesWithStatsUseCase = Container.get(GetFilesWithStatsUseCase)

const folderStructure = {
    'images': {
        'file1.jpeg': '',
        'file2.jpg': '',
    },
    'unknown': {
        'file1': '',
        'file2.gf': '',
        'file3.fds': '',
        'folder1': {
            'folder1': {
                'folder1': {
                    'folder1': {
                        'folder1': {
                            'folder1': {
                                'folder1': {

                                }
                            }
                        }
                    }
                }
            }
        }
    },
    'file1.mp4': '',
    'file2.mp3': '',
    'file3.avi': '',
    'file4.ext': '',
}

describe('list', () => {

    it('gets all files and folders in the directory with its stats', () => withLocalTmpDir(async () => {
        await fs.writeFile('file', 'content')
        console.log('NEW FILE CREATED' + await fs.readFile('file'))

        await outputFiles(folderStructure)

        const files = await getFilesWithStatsUseCase.list(process.cwd(), undefined, undefined)

        expect(files).toHaveLength(6)

        files.forEach(file => {
            expect(file.stats).toBeDefined()
        })

    }))

    it('gets all files and folders recursively in the directory', () => withLocalTmpDir(async () => {
        await outputFiles(folderStructure)

        const files = await getFilesWithStatsUseCase.list(process.cwd(), true, undefined)

        expect(files).toHaveLength(18)

        files.forEach(file => {
            expect(file.stats).toBeDefined()
        })

    }))

    it('gets all files and folders in the directory filtered', () => withLocalTmpDir(async () => {
        await outputFiles(folderStructure)

        const files = await getFilesWithStatsUseCase.list(process.cwd(), true, '\\w+(.avi)$')

        files.forEach(file => {
            expect(file.pathCurrentComplete()).toMatch(new RegExp('\\w+(.avi)$'))
        })

    }))

})