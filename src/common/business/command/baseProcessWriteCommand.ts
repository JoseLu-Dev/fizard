import { CommandOptions } from "./commandOptions";
import { BaseCommand } from "./baseCommand";

export abstract class BaseProcessWriteCommand extends BaseCommand {

    async execute(options: CommandOptions): Promise<void> {

        await this._write(await this._process([], options))
    }

}