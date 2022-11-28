import { CommandOptionsBase } from "../commandOptionsBase";
import { BaseCommand } from "./baseCommand";

export abstract class BaseProcessWriteCommand extends BaseCommand {

    async execute(options: CommandOptionsBase): Promise<void> {

        await this._write(await this._process([], options))
    }

}