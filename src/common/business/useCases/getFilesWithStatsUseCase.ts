import { Service } from "typedi"

import { RegexFilter } from "../filters/regexFilter"
import { ListFilesUnderDirectory } from "../../data/fs/read/listFilesUnderDirectory"
import { ReadFileStats } from "../../data/fs/read/readFileStats"
import { FileWrapper } from "../fileWrapper"


@Service()
export class GetFilesWithStatsUseCase {

    constructor(
        private readonly _listFilesUnderDirectory: ListFilesUnderDirectory,
        private readonly _readFilesPropertiesUseCase: ReadFileStats,
        private readonly _regexFilter: RegexFilter,
    ) { }


    async list(dir: string, recursive?: boolean, regex?: string): Promise<Array<FileWrapper>> {

        let files = await this._getListRecursive(dir, recursive)

        if (regex)
            files = this._regexFilter.filePathCurrent(files, regex)

        return files
    }

    private async _getListRecursive(dir: string, recursive?: boolean): Promise<Array<FileWrapper>>{
        const allFiles: FileWrapper[] = []
        
        let fileNames: Array<string> = await this._listFilesUnderDirectory.list(dir)
        
        for (const fileName of fileNames) {
            let file: FileWrapper = await this._getWholeFileWrapper(dir, fileName)
            
            if (recursive && file.stats?.isDirectory() && !file.stats?.isSymbolicLink()) {
                (await this._getListRecursive(file.pathCurrentComplete(), recursive)).forEach(file=>{
                    allFiles.push(file)
                })
            }

            allFiles.push(file)
        }

        return allFiles
    }

    private async _getWholeFileWrapper(dir: string, fileName: string): Promise<FileWrapper> {
        let file = new FileWrapper({ pathCurrent: dir, name: fileName })
        file.stats = await this._readFilesPropertiesUseCase.read(file.pathCurrentComplete())
        return file
    }
    
}