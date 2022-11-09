const { Command  } = require('commander')
import { CliCommand } from '../../../src/common/cli-command'
import { CommanderAdapter } from './../../../src/adapters/commanderAdapter'

let program
let adapter
let cliCommand: CliCommand = {
  name: "loc",
  description: "shows the current location",
  param:
  {
    name: "extra",
    optional: true
  },
  options: [
    {
      name: "--alphabetized",
      nameAbbreviated: "-a",
      description: "Modifies the output",
      param:
      {
        name: "beta",
        optional: true
      },
      action: ()=>{},
      defaultValue: 'default'
    }
  ],
  action: (param, options) => {

  }
}

beforeEach(()=>{
  program = new Command()
  adapter = new CommanderAdapter(program)
})

describe('addCommand', () => {

  it('adds a command to commander.js', async () => {

    adapter.addCommand(cliCommand)

    const command = program.commands[0]
    
    expect(command._name).toBe(cliCommand.name)
    expect(command._description).toBe(cliCommand.description)

    //expect(command.options[0]).toBe(cliCommand.description)
    //expect(command._args).toBe(cliCommand.description)

    const option = command.options[0]
    let cliOption
    if(cliCommand?.options)
      cliOption = cliCommand?.options[0]
    expect(option.flags).toBe(`[${cliOption?.param?.name}]`)
    expect(option.description).toBe(cliOption?.description)
    expect(option.defaultValue).toBe(cliOption?.defaultValue)
    expect(option.required || false).toBe(cliOption?.param.required || false)
    expect(option.optional || false).toBe(cliOption?.param.optional || false)
    //required
    //optional

    const arg = command._args[0]
    const cliArg = cliCommand.param
    expect(arg.name).toBe(cliArg?.name)
    expect((arg.required || false) == (cliArg?.required || false)).toBeTruthy()
    expect(arg.required).not.toBe(cliArg?.optional)
  })

  it('adds more than one command to commander.js', async () => {

    adapter.addCommand(cliCommand)
    adapter.addCommand(cliCommand)
    adapter.addCommand(cliCommand)
    
    expect(program.commands.length).toBe(3)
  })

})
