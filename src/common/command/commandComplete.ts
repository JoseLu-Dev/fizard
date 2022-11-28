import { CommandOptionsBase } from "../commandOptionsBase";
import { CommandBase } from "./commandBase";

export abstract class CommandComplete extends CommandBase {

    async execute(options: CommandOptionsBase): Promise<void> {

        await this._write(await this._process(await this._read(options), options))
    }

}