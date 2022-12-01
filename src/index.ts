#!/usr/bin/env node
import 'reflect-metadata'

import chalk from 'chalk'
import clear from 'clear'
import figlet from 'figlet'
import { Command } from '@commander-js/extra-typings'
import { Container } from 'typedi'

import { CommandMediator } from './command/commandMediator'

const program: Command = new Command()

clear()
console.log(
  chalk.green(
    figlet.textSync('file-cli', { horizontalLayout: 'full' })
  )
)

program
  .description('A cli files/folder utilities program')

Container.get(CommandMediator).mediate(program)

program.parse(process.argv)
