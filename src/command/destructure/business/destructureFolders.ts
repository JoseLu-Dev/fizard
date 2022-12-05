import { Service } from "typedi"

import { GetFilesWithStatsUseCase } from "../../../common/business/useCases/getFilesWithStatsUseCase"
import { WriteComputedFilesUseCase } from "../../../common/business/useCases/writeComputedFilesUseCase"
import { FileWrapper } from "../../../common/business/fileWrapper"
import { FileWrapperFilter } from "../../../common/business/filters/fileWrapperFilter"
import { CommandComplete } from "../../../common/business/command/commandComplete"
import { CommandOptions } from "../../../common/business/command/commandOptions"
import { MarkFilesToDeleteUseCase } from "./useCases/markFilesToDeleteUseCase"
import { MoveFilesToRootUseCase } from "./useCases/moveFilesToRootUseCase"

@Service()
export class DestructureFolders extends CommandComplete {

    constructor(
        _getFilesMetadataUseCase: GetFilesWithStatsUseCase,
        _writeComputedFilesUseCase: WriteComputedFilesUseCase,
        private readonly _fileWrapperFilter: FileWrapperFilter,
        private readonly _markFilesToDeleteUseCase: MarkFilesToDeleteUseCase,
        private readonly _moveFilesToRootUseCase: MoveFilesToRootUseCase,
    ) {
        super(
            _getFilesMetadataUseCase,
            _writeComputedFilesUseCase,
        )
    }

    protected _process(files: FileWrapper[], options: CommandOptions): Promise<FileWrapper[]> {

        const filesFiltered = this._fileWrapperFilter.removeDirs(files)
        this._moveFilesToRootUseCase.move(filesFiltered, options.path)

        const folders = this._fileWrapperFilter.removeFiles(files)
        this._markFilesToDeleteUseCase.mark(folders)

        return Promise.resolve([...filesFiltered, ...folders])
    }

}