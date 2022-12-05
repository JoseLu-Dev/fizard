import 'reflect-metadata'
import { Command } from '@commander-js/extra-typings'
import { Container } from 'typedi'

import { CommandMediator } from './command/commandMediator'

export async function parseArgs(argv: string[]): Promise<Command<[], {}>>{
    
    const program: Command = new Command()
    
    program
      .description('A cli files/folder utilities program')
    
    Container.get(CommandMediator).mediate(program)

    return program.parseAsync(argv)
}