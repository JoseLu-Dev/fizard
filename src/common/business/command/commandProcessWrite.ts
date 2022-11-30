import { CommandOptions } from "./commandOptions";
import { Command } from "./command";

export abstract class CommandProcessWrite extends Command {

    async execute(options: CommandOptions): Promise<void> {

        await this._write(await this._process([], options))
    }

}