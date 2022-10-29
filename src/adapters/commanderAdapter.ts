import commander from "commander";
import { CliCommand } from "./cli-command";
import { CliParametrized } from "./cli-parametrized";

export class CommanderAdapter {

    constructor(private _commanderProgram: commander.Command) {

    }

    addCommand(command: CliCommand): void {
        /*this._commanderProgram
            .command(command.name)
            .description(command.description)
            .option("-t", "Per type")
            .option("-d <timeUnit>", "Per date [day, month, year]")

        this._commanderProgram
            .action(command.action)*/

        let commanderCommand = this._commanderProgram.command(`${command.name} ${this._getParametersString(command)}`)
        commanderCommand.description(command.description)
        this._addOptions(commanderCommand, command)
        commanderCommand.action(command.action)
    }

    private _addOptions(commanderCommand: commander.Command, command: CliCommand): void {
        if (!command.options) return

        command.options.forEach((option) => {
            commanderCommand.option(`-a, --alphabetized <alpha>`, option.description)
        })
    }

    private _getParametersString(parametrized: CliParametrized): string {
        if (!parametrized.param) return ''

        if (parametrized.param.required) return `<${parametrized.param.name}>`
        if (parametrized.param.optional) return `[${parametrized.param.name}]`
        return parametrized.param.name
    }

}