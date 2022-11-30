import { CommandOptions } from "./commandOptions";
import { BaseCommand } from "./baseCommand";

export abstract class BaseReadProcessCommand extends BaseCommand {

    async execute(options: CommandOptions): Promise<void> {
        
        await this._process(await this._read(options), options)
    }

}