import { Service } from "typedi"

import { FileWrapper } from "../fileWrapper"
import { RegexFilter } from "../filters/regexFilter"
import { FindOptions } from "../findOptions"
import { ListFilesUnderDirectory } from "../fs/read/listFilesUnderDirectory"
import { ReadFileStats } from "../fs/read/readFileStats"


@Service()
export class GetFilesWithStatsUseCase {

    constructor(
        private readonly _listFilesUnderDirectory: ListFilesUnderDirectory,
        private readonly _readFilesPropertiesUseCase: ReadFileStats,
        private readonly _regexFilter: RegexFilter,
    ) { }


    async list(dir: string, options: FindOptions): Promise<Array<FileWrapper>> {

        let files = await this._getListRecursive(dir, options)

        if (options.regex)
            files = this._regexFilter.filePathCurrent(files, options.regex)

        return files
    }

    private async _getListRecursive(dir: string, options: FindOptions): Promise<Array<FileWrapper>>{
        const allFiles: FileWrapper[] = []

        let fileNames: Array<string> = await this._listFilesUnderDirectory.list(dir)

        for (const fileName of fileNames) {
            let file: FileWrapper = await this._getWholeFileWrapper(dir, fileName)

            if (options.recursive && file.stats?.isDirectory()) {
                allFiles.push(...await this.list(file.pathCurrentComplete(), options))
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