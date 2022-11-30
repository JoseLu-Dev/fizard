import { CommandOptions } from "./commandOptions";
import { Command } from "./command";

export abstract class CommandReadProcess extends Command {

    async execute(options: CommandOptions): Promise<void> {
        
        await this._process(await this._read(options), options)
    }

}