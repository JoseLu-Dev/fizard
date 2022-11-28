import { CommandOptionsBase } from "../commandOptionsBase";
import { CommandBase } from "./commandBase";

export abstract class CommandReadProcess extends CommandBase {

    async execute(options: CommandOptionsBase): Promise<void> {
        
        await this._process(await this._read(options), options)
    }

}