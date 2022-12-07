import * as path from 'path'
import { FileWrapper } from "../../../../../../src/common/business/fileWrapper"
import { ParseFolderStructureUseCase } from '../../../../../../src/command/structure/business/useCases/parseFolderStructureUseCase';
import { Stats } from 'fs';


const parseFolderStructure = new ParseFolderStructureUseCase()


describe('create', () => {

    it('creates simple folder structure', async () => {

        const structure = ['folder-folder2-file.f', 'subfolder-file.r', 'file.ff']

        const filesStructure: FileWrapper[][] = parseFolderStructure.parse(structure)

        expect(filesStructure).toHaveLength(3)

        expect(filesStructure[0]).toHaveLength(3)
        expect(filesStructure[1]).toHaveLength(2)
        expect(filesStructure[2]).toHaveLength(1)



        expect(JSON.stringify(filesStructure[0][0])).toEqual(JSON.stringify(new FileWrapper({
            name: 'folder', pathCurrent: '',
            stats: { isFile: () => false, isDirectory: () => true } as Stats
        })))

        expect(JSON.stringify(filesStructure)).toEqual(JSON.stringify([
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
            ],
        ] as FileWrapper[][]))
    })

})