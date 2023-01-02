import { GetFilesWithStatsUseCase } from "../useCases/getFilesWithStatsUseCase";
import { WriteComputedFilesUseCase } from "../useCases/writeComputedFilesUseCase";
import { Command } from "./command";
import { CommandOptions } from "./commandOptions";
import { cli, Color } from '../../presentation/cli';

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

        cli.spinnerStart('Reading', Color.YELLOW)
        let files = await this._read(options)
        cli.spinnerSuccess()

        cli.spinnerStart('Processing', Color.MAGENTA)
        files = await this._process(files, options)
        cli.spinnerSuccess()

        cli.spinnerStart('Writing', Color.GREEN)
        await this._write(files)
        cli.spinnerSuccess()
    }

}