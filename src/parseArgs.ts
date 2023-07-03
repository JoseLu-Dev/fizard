import 'reflect-metadata'
import { Command } from '@commander-js/extra-typings'
import { Container } from 'typedi'

import { CommandMediator } from './command/commandMediator'
import { cli } from './common/cli';
import { ErrorControlled } from './common/errors';

export async function parseArgs(argv: string[]): Promise<void> {

  const program: Command = new Command()

  program
    .name('fizard')
    .usage('command [command options]')
    .description('A cli files/folders utilities program')
    .version('v0.1')

  Container.get(CommandMediator).mediate(program)

  try {

    await program.parseAsync(argv)

  } catch (e) {

    if (e instanceof ErrorControlled) {
      return cli.warn(e.message)
    }

    if (e instanceof Error) {
      return cli.error(`${e}`, e)
    }

    cli.error(`${e}`, new Error(`${e}`))
  }

}