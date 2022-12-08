import * as path from 'path'
import { Stats } from 'fs';

import { FileWrapper } from "../../../../../../src/common/business/fileWrapper"
import { CreateFolderStructureUseCase } from '../../../../../../src/command/structure/business/useCases/createFolderStructureUseCase';


const createFolderStructure = new CreateFolderStructureUseCase()


describe('create', () => {

    it('creates simple folder structure', async () => {

        const folderStructure: FileWrapper[][] = [
            [
                new FileWrapper({
                    name: 'folder', pathCurrent: '',
                    stats: { isFile: () => false, isDirectory: () => true } as Stats
                }),
                new FileWrapper({
                    name: 'folder2', pathCurrent: '',
                    stats: { isFile: () => false, isDirectory: () => true } as Stats
                }),
                new FileWrapper({
                    name: 'file.f', pathCurrent: '',
                    stats: { isFile: () => true, isDirectory: () => false } as Stats
                }),
            ],
            [
                new FileWrapper({
                    name: 'subfolder', pathCurrent: '',
                    stats: { isFile: () => false, isDirectory: () => true } as Stats
                }),
                new FileWrapper({
                    name: 'file.r', pathCurrent: '',
                    stats: { isFile: () => true, isDirectory: () => false } as Stats
                }),
            ],
            [
                new FileWrapper({
                    name: 'file.ff', pathCurrent: '',
                    stats: { isFile: () => true, isDirectory: () => false } as Stats
                }),
                new FileWrapper({
                    name: 'folder', pathCurrent: '',
                    stats: { isFile: () => true, isDirectory: () => true } as Stats
                }),
            ],
        ] as FileWrapper[][]

        const fileStructure = createFolderStructure.create(folderStructure, '')

        expect(fileStructure).toHaveLength(11)
    })

})