import { Service } from "typedi"
import * as path from 'path'

import { FileWrapper } from "../../../../common/business/fileWrapper"
import { Stats } from 'fs';

@Service()
export class ParseFolderStructureUseCase {

    constructor(
        
    ) { }

    parse(structure: string[]): FileWrapper[][] {
        let fileStructure: FileWrapper[][] = []

        for (let index = 0; index < structure.length; index++) {
            fileStructure.push(this._parseFiles(structure[index].split('-')))
        }

        return fileStructure
    }

    private _parseFiles(filesNames: string[]): FileWrapper[]{
        const filesParsed: FileWrapper[] = []

        for (const fileName of filesNames) {
            let isFile = fileName.split('.').length>1
            filesParsed.push(
                new FileWrapper({
                    name: fileName, pathCurrent: '',
                    stats: { isFile: () => isFile, isDirectory: () => !isFile } as Stats
                }),
            )
        }

        return filesParsed
    } 


}