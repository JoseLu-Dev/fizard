const withLocalTmpDir = require('with-local-tmp-dir')
const outputFiles = require('output-files')
const dirTree = require("directory-tree");

import { parseArgs } from '../../src/parseArgs'
import { cli } from '../../src/common/cli';
import { DirTree } from '../utils/dirTree';

const infoSpied = jest.spyOn(cli, 'info').mockImplementation()

const folderStructure = {
    'video.mp4': 'content',
    'text1.txt': 'duplicated',
    'text2.txt': 'duplicated',
    'text3.txt': 'duplicated',
    'videoDupl.mp4': 'content',
    'originalContent.mp4': 'originalContent',
}


describe('findDuplicates', () => {

    it('finds duplicated files', () => withLocalTmpDir(async () => {
        await outputFiles(folderStructure)

        await parseArgs(['', '', 'findDuplicates'])

        expect(infoSpied).toHaveBeenCalledTimes(7)
        expect(infoSpied).toHaveBeenCalledWith('Files with hash b3007a674e4344e67a8bd6ddce86b8a6')
        expect(infoSpied).toHaveBeenCalledWith('Files with hash 9a0364b9e99bb480dd25e1f0284c8555')
    }))

    it('delete duplicated files leaving one copy only', () => withLocalTmpDir(async () => {
        await outputFiles(folderStructure)

        await parseArgs(['', '', 'findDuplicates', '-d'])

        const tree: DirTree = dirTree(process.cwd(), { attributes: ['type'] });

        expect(tree.children).toHaveLength(3)
    }))
})
