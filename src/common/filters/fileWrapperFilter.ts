import { Service } from "typedi"

import { FileWrapper } from "../fileWrapper"

@Service()
export class FileWrapperFilter {

    removeDirs (files: Array<FileWrapper>): Array<FileWrapper> {
        return files.filter(e=> !e.stats?.isDirectory())
    }

}