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
import { FindDuplicatesOptions } from './findDuplicatesOptions';

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

        const deleteDuplicates = (options.specificOptions as FindDuplicatesOptions).deleteDuplicates
        this._checkDuplicates(hashFilesDict, deleteDuplicates)

        cli.loadingEnd()

        if(deleteDuplicates) await this._write(files)

        return []
    }

    private _checkDuplicates(hashFilesDict: Record<string, FileWrapper[]>, deleteDuplicates?: boolean) {

        Object.entries(hashFilesDict).forEach(dictEntry => {

            if (dictEntry[1].length <= 1) return

            if (!deleteDuplicates) cli.info(`Files with hash ${dictEntry[0]}`)

            dictEntry[1].forEach((file, index) => {

                if(deleteDuplicates && index > 0){
                    file.isDeletedMarked = true
                    return
                }
                cli.info(`${file.pathCurrentComplete()}`)
            })
        })
    }


}