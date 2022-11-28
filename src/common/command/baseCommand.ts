import { FileWrapper } from "../fileWrapper"
import { CommandOptionsBase } from "../commandOptionsBase";
import { GetFilesWithStatsUseCase } from "../useCases/getFilesWithStatsUseCase";
import { WriteComputedFilesUseCase } from "../useCases/writeComputedFilesUseCase";

export abstract class BaseCommand {

    constructor(
        private readonly _getFilesMetadataUseCase: GetFilesWithStatsUseCase,
        private readonly _writeComputedFiles: WriteComputedFilesUseCase,
    ) { }

    abstract execute(options: CommandOptionsBase): Promise<void>

    protected abstract _process(files: Array<FileWrapper>, options: CommandOptionsBase): Promise<Array<FileWrapper>> //processed

    protected async _read(options: CommandOptionsBase): Promise<Array<FileWrapper>> {
        return this._getFilesMetadataUseCase.list(options.path, options.findOptions.recursive, options.findOptions.regex)
    }

    protected async _write(files: Array<FileWrapper>): Promise<void> {
        await this._writeComputedFiles.write(files)
    }
}