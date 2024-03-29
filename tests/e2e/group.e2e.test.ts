const withLocalTmpDir = require('with-local-tmp-dir')
const outputFiles = require('output-files')
const dirTree = require("directory-tree");

import { DirTree } from '../utils/dirTree';

import { parseArgs } from '../../src/parseArgs'
import { cli } from '../../src/common/cli';
import { ErrorControlled } from '../../src/common/errors';
const errorSpied = jest.spyOn(cli, 'error').mockImplementation()

const folderStructure = {
    'video.mp4': '',
    'text.txt': '',
}

const folderStructureOnlyFolders = {
    'videos': {},
    'files': {},
}

describe('group by date', () => {

    it('moves files under a <YYYY-MM-DD> folder', () => withLocalTmpDir(async () => {
        await outputFiles(folderStructure)

        await parseArgs(['', '', 'group', '-d', 'YYYY-MM-DD'])

        const tree: DirTree = dirTree(process.cwd(), { attributes: ['type'] });

        expect(tree.children).toHaveLength(1)

        const dateFolder = tree.children[0]
        const date = new Date()
        expect(dateFolder.name).toBe(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        expect(dateFolder.children).toHaveLength(2)
    }))

    it('moves files under a <YYYY/MM/DD> folder structure', () => withLocalTmpDir(async () => {
        await outputFiles(folderStructure)

        await parseArgs(['', '', 'group', '-d', 'YYYY//MM//DD'])

        const tree: DirTree = dirTree(process.cwd(), { attributes: ['type'] });

        expect(tree.children).toHaveLength(1)

        const yearFolder = tree.children[0]
        const date = new Date()
        expect(yearFolder.name).toBe(`${date.getFullYear()}`)

        const monthFolder = yearFolder.children[0]
        expect(monthFolder.name).toBe(`${date.getMonth() + 1}`)

        const dayFolder = monthFolder.children[0]
        expect(dayFolder.name).toBe(`${date.getDate()}`)

    }))

    it('shows an error when date format does not have any of YYYY MM or DD', () => withLocalTmpDir(async () => {
        
        await parseArgs(['', '', 'group', '-d', 'invalidFormat'])

        expect(errorSpied).toHaveBeenCalledWith('Error: Date format parameter string must contain YYYY, MM or DD', new ErrorControlled('Date format parameter string must contain YYYY, MM or DD'))

    }))
})

describe('group by file extension', () => {

    it('moves files under a <type> folder', () => withLocalTmpDir(async () => {
        await outputFiles(folderStructure)

        await parseArgs(['', '', 'group', '-e'])

        const tree: DirTree = dirTree(process.cwd(), { attributes: ['type'] });

        expect(tree.children).toHaveLength(2)

        const folderText = tree.children.filter(c => c.name === 'text')[0]
        expect(folderText.children[0].name).toBe('text.txt')

        const folderVideo = tree.children.filter(c => c.name === 'video')[0]
        expect(folderVideo.children[0].name).toBe('video.mp4')

    }))

})

describe('group by multiple options', () => {

    it('groups in the order given filetype/date/file', () => withLocalTmpDir(async () => {
        await outputFiles(folderStructure)

        await parseArgs(['', '', 'group', '-e', '-d', 'YYYY-MM-DD'])

        const tree: DirTree = dirTree(process.cwd(), { attributes: ['type'] });

        expect(tree.children).toHaveLength(2)
        
        const date = new Date()

        const folderText = tree.children.filter(c => c.name === 'text')[0]
        const folderTextDate = folderText.children[0]
        expect(folderTextDate.name).toBe(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        expect(folderTextDate.children[0].name).toBe('text.txt')

        const folderVideo = tree.children.filter(c => c.name === 'video')[0]
        const folderVideoDate = folderVideo.children[0]
        expect(folderVideoDate.name).toBe(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        expect(folderVideoDate.children[0].name).toBe('video.mp4')

    }))

    it('groups in the order given date/filetype/file', () => withLocalTmpDir(async () => {
        await outputFiles(folderStructure)

        await parseArgs(['', '', 'group', '-d', 'YYYY-MM-DD', '-e'])

        const tree: DirTree = dirTree(process.cwd(), { attributes: ['type'] });

        expect(tree.children).toHaveLength(1)
        
        const date = new Date()

        const folderDate = tree.children[0]
        expect(folderDate.name).toBe(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)

        expect(folderDate.children).toHaveLength(2)

        const folderDateText = folderDate.children.filter((f)=>f.name === 'text')[0]
        expect(folderDateText.children[0].name).toBe('text.txt')

        const folderDateVideo = folderDate.children.filter((f)=>f.name === 'video')[0]
        expect(folderDateVideo.children[0].name).toBe('video.mp4')

    }))

    it('does nothing when no files are found', () => withLocalTmpDir(async () => {
        await outputFiles(folderStructureOnlyFolders)

        await parseArgs(['', '', 'group', '-e'])

        const tree: DirTree = dirTree(process.cwd());

        expect(tree.children).toHaveLength(2)
    }))

})