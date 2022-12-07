import { Service } from "typedi"
import * as path from 'path'

import { FileWrapper } from "../../../../common/business/fileWrapper"

@Service()
export class CreateFolderStructureUseCase {

    constructor(

    ) { }

    create(structure: FileWrapper[][], dirPath: string, level: number = 0): FileWrapper[] {

        const files: FileWrapper[] = []

        for (let index = 0; index < structure[level].length; index++) {

            const file = structure[level][index]

            files.push(new FileWrapper({name: file.name, pathCurrent: dirPath, isNew: true, stats: file.stats}))
            
            if(file.stats?.isDirectory()){
                files.push(...this.create(structure, path.join(dirPath, file.name), level+1))
            }
            
        }

        return files
    }

}