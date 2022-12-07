import { Service } from "typedi"

import { GetFilesWithStatsUseCase } from "../../../common/business/useCases/getFilesWithStatsUseCase"
import { WriteComputedFilesUseCase } from "../../../common/business/useCases/writeComputedFilesUseCase"
import { FileWrapper } from "../../../common/business/fileWrapper"
import { FileWrapperFilter } from "../../../common/business/filters/fileWrapperFilter"
import { CommandOptions } from "../../../common/business/command/commandOptions"
import { CommandProcessWrite } from "../../../common/business/command/commandProcessWrite"
import { ParseFolderStructureUseCase } from "./useCases/parseFolderStructureUseCase"
import { CreateFolderStructureUseCase } from './useCases/createFolderStructureUseCase';
import { StructureOptions } from './structureOptions';

@Service()
export class StructureCreate extends CommandProcessWrite {

    constructor(
        _getFilesMetadataUseCase: GetFilesWithStatsUseCase,
        _writeComputedFilesUseCase: WriteComputedFilesUseCase,
        private readonly _fileWrapperFilter: FileWrapperFilter,
        private readonly _parseFolderStructureUseCase: ParseFolderStructureUseCase,
        private readonly _createFolderStructureUseCase: CreateFolderStructureUseCase,
    ) {
        super(
            _getFilesMetadataUseCase,
            _writeComputedFilesUseCase,
        )
    }

    protected _process(files: FileWrapper[], options: CommandOptions): Promise<FileWrapper[]> {

        if(!options.specificOptions) throw new Error('No structure options provided')

        const structure = (options.specificOptions as StructureOptions).structure
        if(!structure) throw new Error('No structure provided')

        const fileStructure = this._parseFolderStructureUseCase.parse(structure)
        files = this._createFolderStructureUseCase.create(fileStructure, options.path)

        return Promise.resolve(files)
    }

}