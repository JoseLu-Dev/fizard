import { Color, LoaderSpinner } from "../../presentation/loaderSpinner";
import { GetFilesWithStatsUseCase } from "../useCases/getFilesWithStatsUseCase";
import { WriteComputedFilesUseCase } from "../useCases/writeComputedFilesUseCase";
import { Command } from "./command";
import { CommandOptions } from "./commandOptions";

export abstract class CommandComplete extends Command {

    constructor(
        _getFilesMetadataUseCase: GetFilesWithStatsUseCase,
        _writeComputedFilesUseCase: WriteComputedFilesUseCase,
        private readonly _loaderSpinner: LoaderSpinner
    ) {
        super(
            _getFilesMetadataUseCase,
            _writeComputedFilesUseCase
        )
    }

    async execute(options: CommandOptions): Promise<void> {

        this._loaderSpinner.start('Reading', Color.YELLOW)
        let files = await this._read(options)

        this._loaderSpinner.update('Processing', Color.MAGENTA)
        files = await this._process(files, options)

        this._loaderSpinner.update('Writing', Color.GREEN)
        await this._write(files)

        this._loaderSpinner.stop()
    }

}