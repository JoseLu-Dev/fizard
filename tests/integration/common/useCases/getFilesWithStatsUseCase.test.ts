import 'reflect-metadata'

const withLocalTmpDir = require('with-local-tmp-dir')
const outputFiles = require('output-files')
import { Container } from 'typedi'

import { GetFilesWithStatsUseCase } from '../../../../src/common/useCases/getFilesWithStatsUseCase'

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
        await outputFiles(folderStructure)

        const files = await getFilesWithStatsUseCase.list(process.cwd(), {})

        expect(files).toHaveLength(6)

        files.forEach(file => {
            expect(file.stats).toBeDefined()
        })

    }))

    it('gets all files and folders recursively in the directory', () => withLocalTmpDir(async () => {
        await outputFiles(folderStructure)

        const files = await getFilesWithStatsUseCase.list(process.cwd(), { recursive: true })

        expect(files).toHaveLength(18)

        files.forEach(file => {
            expect(file.stats).toBeDefined()
        })

    }))

    it('gets all files and folders in the directory filtered', () => withLocalTmpDir(async () => {
        await outputFiles(folderStructure)

        const files = await getFilesWithStatsUseCase.list(process.cwd(), { recursive: true, regex: '\\w+(.avi)$' })

        files.forEach(file => {
            expect(file.pathCurrentComplete()).toMatch(new RegExp('\\w+(.avi)$'))
        })

    }))

})