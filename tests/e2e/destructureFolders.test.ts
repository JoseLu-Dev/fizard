const withLocalTmpDir = require('with-local-tmp-dir')
const outputFiles = require('output-files')
const dirTree = require("directory-tree");

import { DirTree } from '../utils/dirTree';

import { parseArgs } from '../../src/parseArgs'

const folderStructure = {
    'files': {},
    'folders': {
        'fold': {
            'file': ''
        },
        'fold2': {},
        'fold3': {},
    },
    'evenMoreFolders': {
        'fold': {
            'folder1': {
                'folder1': {
                    'folder1': {
                        'folder1': {
                            'folder1': {
                                'folder1': {
                                    'folder1': {
                                        'file2': '',
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
    }
}

const folderStructureOnlyFiles = {
    'file': '',
    'file2': '',
}


describe('group by date', () => {

    it('moves files under a <dd-mm-yyyy> folder', () => withLocalTmpDir(async () => {
        await outputFiles(folderStructure)

        await parseArgs(['', '', 'destructure'])

        const tree: DirTree = dirTree(process.cwd(), { attributes: ['type'] });

        expect(tree.children).toHaveLength(2)

        const files = tree.children

        files.forEach(f => {
            expect(f.type).toBe('file')
        })
    }))

    it('does nothing with files at root folder', () => withLocalTmpDir(async () => {
        await outputFiles(folderStructureOnlyFiles)

        await parseArgs(['', '', 'destructure'])

        const tree: DirTree = dirTree(process.cwd(), { attributes: ['type'] });

        expect(tree.children).toHaveLength(2)

        const files = tree.children

        files.forEach(f => {
            expect(f.type).toBe('file')
        })
    }))
})