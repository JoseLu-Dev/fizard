import commander from "commander"
import { CliCommand } from "../common/cli-command"
import { CliParametrized } from "../common/cli-parametrized"

export class CommanderAdapter {

    constructor(private _commanderProgram: commander.Command) { }

    addCommand(command: CliCommand): void {
        let commanderCommand = this._commanderProgram.command(`${command.name} ${this._getParametersString(command)}`)
        commanderCommand.description(command.description)
        this._addOptions(commanderCommand, command)
        commanderCommand.action(command.action)

    }
    
    private _addOptions(commanderCommand: commander.Command, command: CliCommand): void {
        if (!command.options) return

        command.options.forEach((option) => {
            commanderCommand.option(this._getParametersString(option), option.description, option.defaultValue)
        })
    }

    private _getParametersString(parametrized: CliParametrized): string {
        if (!parametrized.param) return ''

        if (parametrized.param.required) return `<${parametrized.param.name}>`
        if (parametrized.param.optional) return `[${parametrized.param.name}]`
        return parametrized.param.name
    }

}