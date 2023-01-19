import { cli, Color } from "../../cli";
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

        let files = await this._read(options)

        cli.spinnerStart('Processing', Color.MAGENTA)
        files = await this._process(files, options)
        cli.spinnerSuccess()

        await this._write(files)
    }

}