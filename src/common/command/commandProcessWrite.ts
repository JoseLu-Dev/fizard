import { CommandOptionsBase } from "../commandOptionsBase";
import { CommandBase } from "./commandBase";

export abstract class CommandProcessWrite extends CommandBase {

    async execute(options: CommandOptionsBase): Promise<void> {

        await this._write(await this._process([], options))
    }

}