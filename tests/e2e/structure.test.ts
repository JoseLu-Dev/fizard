const withLocalTmpDir = require('with-local-tmp-dir')
const dirTree = require("directory-tree");

import { DirTree } from '../utils/dirTree';

import { parseArgs } from '../../src/parseArgs'


describe('structure', () => {

    it('creates a folder and file structure', () => withLocalTmpDir(async () => {

        await parseArgs(['', '', 'structure', '-s', 'folder-folder2-folder3', 'file.txt-subfolder-subfolder2', 'childFolder-file.txt'])

        const tree: DirTree = dirTree(process.cwd());

        expect(tree.children).toHaveLength(3)

        const folder2 = tree.children.filter(c=>c.name==='folder2')[0]
        const folder3 = tree.children.filter(c=>c.name==='folder3')[0]

        const folder2Subfolder = folder2.children.filter(c=>c.name==='subfolder')[0]
        expect(folder2Subfolder.children).toHaveLength(2)
        expect(folder2Subfolder.children.filter(c=>c.name==='childFolder')[0]).toBeDefined()
        expect(folder2Subfolder.children.filter(c=>c.name==='file.txt')[0]).toBeDefined()

        expect(folder2.children.filter(c=>c.name==='subfolder2')[0].children).toHaveLength(2)

        expect(folder3.children.filter(c=>c.name==='subfolder')[0].children).toHaveLength(2)
        expect(folder3.children.filter(c=>c.name==='subfolder2')[0].children).toHaveLength(2)

    }))
})
