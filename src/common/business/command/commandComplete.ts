import { Color, loaderSpinner } from "../../presentation/loaderSpinner";
import { GetFilesWithStatsUseCase } from "../useCases/getFilesWithStatsUseCase";
import { WriteComputedFilesUseCase } from "../useCases/writeComputedFilesUseCase";
import { Command } from "./command";
import { CommandOptions } from "./commandOptions";

export abstract class CommandComplete extends Command {

    constructor(
        _getFilesMetadataUseCase: GetFilesWithStatsUseCase,
        _writeComputedFilesUseCase: WriteComputedFilesUseCase,
    ) {
        super(
            _getFilesMetadataUseCase,
            _writeComputedFilesUseCase
        )
    }

    async execute(options: CommandOptions): Promise<void> {

        loaderSpinner.start('Reading', Color.YELLOW)
        let files = await this._read(options)

        loaderSpinner.update('Processing', Color.MAGENTA)
        files = await this._process(files, options)

        loaderSpinner.update('Writing', Color.GREEN)
        await this._write(files)

        loaderSpinner.stop()
    }

}