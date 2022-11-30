import { Command } from "./command";
import { CommandOptions } from "./commandOptions";

export abstract class CommandComplete extends Command {

    async execute(options: CommandOptions): Promise<void> {

        await this._write(await this._process(await this._read(options), options))
    }

}