import 'reflect-metadata'
import { Command } from '@commander-js/extra-typings'
import { Container } from 'typedi'

import { CommandMediator } from './command/commandMediator'

export async function parseArgs(argv: string[]): Promise<Command<[], {}>>{
    
    const program: Command = new Command()
    
    program
      .name('fizard')
      .usage('command [command options]')
      .description('A cli files/folders utilities program')
      .version('v0.1')
    
    Container.get(CommandMediator).mediate(program)

    return program.parseAsync(argv)
}