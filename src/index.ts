#!/usr/bin/env node

const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const { Command  } = require('commander')
import { CommanderAdapter } from './adapters/commanderAdapter'

const program = new Command()

clear()
console.log(
  chalk.green(
    figlet.textSync('file-cli', { horizontalLayout: 'full' })
  )
)

program
  .version('0.0.1')
  .description("File-folder utilities")


const adapter = new CommanderAdapter(program)

adapter.addCommand({
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
      action: ()=>{}
    }
  ],
  action: (param, options) => {
    console.log("----------------------------NAME: -------------------------------")
    console.log(param)
    console.log("----------------------------OPTIONS: ----------------------------")
    console.log(options)
    console.log(process.cwd())
  }
})

program.parse(process.argv)
