import { Service } from "typedi"

import { FileWrapper } from "../fileWrapper";
import { FileWrapperFilter } from "../filters/fileWrapperFilter";
import { FileObjectMapper } from "../mappers/fileObjectMapper";
import { ListFilesUnderDirectoryUseCase } from "./listFilesUnderDirectoryUseCase";
import { ReadFilesPropertiesUseCase } from "./readFilesPropertiesUseCase";


@Service()
export class GetFilesWithPropertiesUseCase {

    constructor(
        private readonly _listFilesUnderDirectory: ListFilesUnderDirectoryUseCase,
        private readonly _fileObjectMapper: FileObjectMapper,
        private readonly _readFilesPropertiesUseCase: ReadFilesPropertiesUseCase,
        private readonly _fileWrapperFilter: FileWrapperFilter,
    ) { }

    async getList(dir: string): Promise<Array<FileWrapper>> {

        const fileNames: Array<string> = await this._listFilesUnderDirectory.list(dir)

        let files: Array<FileWrapper> = this._fileObjectMapper.fromPathList(fileNames)

        files = await this._readFilesPropertiesUseCase.read(files)

        files = this._fileWrapperFilter.removeDirs(files)

        return files
    }

}