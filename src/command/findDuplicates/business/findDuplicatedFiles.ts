import { Service } from "typedi"

import { GetFilesWithStatsUseCase } from "../../../common/business/useCases/getFilesWithStatsUseCase"
import { WriteComputedFilesUseCase } from "../../../common/business/useCases/writeComputedFilesUseCase"
import { FileWrapper } from "../../../common/business/fileWrapper"
import { CommandOptions } from "../../../common/business/command/commandOptions"
import { CommandReadProcess } from '../../../common/business/command/commandReadProcess';
import { CalculateFilesHash } from "./useCases/calculateFilesHash"
import { GroupDuplicateFiles } from "./useCases/groupDuplicateFiles"
import { cli } from '../../../common/cli';
import { FileWrapperFilter } from "../../../common/business/filters/fileWrapperFilter"

@Service()
export class FindDuplicatedFiles extends CommandReadProcess {

    constructor(
        _getFilesMetadataUseCase: GetFilesWithStatsUseCase,
        _writeComputedFilesUseCase: WriteComputedFilesUseCase,
        private readonly _calculateFilesChecksum: CalculateFilesHash,
        private readonly _groupDuplicateFiles: GroupDuplicateFiles,
        private readonly _fileWrapperFilter: FileWrapperFilter,
    ) {
        super(
            _getFilesMetadataUseCase,
            _writeComputedFilesUseCase,
        )
    }

    protected async _process(files: FileWrapper[], options: CommandOptions): Promise<FileWrapper[]> {

        cli.loadingStart(files.length, 'Calculating files hash')

        files = this._fileWrapperFilter.removeDirs(files)

        this._calculateFilesChecksum.calculate(files, (index: number) => {
            cli.loadingUpdate(index)
        })

        const hashFilesDict: Record<string, FileWrapper[]> = this._groupDuplicateFiles.group(files)

        this._printDuplicates(hashFilesDict)

        cli.loadingEnd()
        return []
    }

    private _printDuplicates(hashFilesDict: Record<string, FileWrapper[]>) {

        Object.entries(hashFilesDict).forEach(dictEntry => {

            if (dictEntry[1].length <= 1) return

            cli.info(`Files with hash ${dictEntry[0]}`)

            dictEntry[1].forEach(file => {

                cli.info(`${file.pathCurrentComplete()}`)
            })
        })
    }


}