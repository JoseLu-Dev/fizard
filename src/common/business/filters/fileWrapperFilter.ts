import { Service } from "typedi"

import { FileWrapper } from "../fileWrapper"

@Service()
export class FileWrapperFilter {

    removeDirs(files: Array<FileWrapper>): Array<FileWrapper> {
        return files.filter(e => !e.stats?.isDirectory())
    }

    removeFiles(files: Array<FileWrapper>): Array<FileWrapper> {
        return files.filter(e => !e.stats?.isFile())
    }

    removeFilesOfPath(files: Array<FileWrapper>, path: string): Array<FileWrapper> {
        return files.filter(e => !e.stats?.isFile() || e.pathCurrent !== path)
    }

}