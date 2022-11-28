import { CommandOptionsBase } from "../commandOptionsBase";
import { BaseCommand } from "./baseCommand";

export abstract class BaseReadProcessCommand extends BaseCommand {

    async execute(options: CommandOptionsBase): Promise<void> {
        
        await this._process(await this._read(options), options)
    }

}