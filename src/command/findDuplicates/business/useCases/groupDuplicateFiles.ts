import { Service } from "typedi"

import { FileWrapper } from "../../../../common/business/fileWrapper"

@Service()
export class GroupDuplicateFiles {

    constructor() { }

    group(files: Array<FileWrapper>): Record<string, FileWrapper[]> {
        const hashFilesDict: Record<string, FileWrapper[]> = {}

        for (const file of files) {

            if(!file.hash) continue

            if(!hashFilesDict[file.hash]) hashFilesDict[file.hash] = []

            hashFilesDict[file.hash].push(file)
        }

        return hashFilesDict
        
    }

}