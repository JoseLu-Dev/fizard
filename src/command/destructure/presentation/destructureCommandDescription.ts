import { Command } from '@commander-js/extra-typings'
import { Service } from 'typedi'
import { DestructureFolders } from '../business/destructureFolders';

@Service()
export class DestructureCommandDescription {

    constructor(
        private readonly _destructureFolders: DestructureFolders,
    ) { }

    /**
     * Defines and adds commands to a commander-js program
     * @param program commander-js program to add commands to
     */
    apply(program: Command, executionPath: string) {

        program
            .command('destructure')
            .summary('Moves all files under folder structure to the execution path')
            .action(() => {
                return this._destructureFolders.execute({ path: executionPath, findOptions: { recursive: true } })
            })

    }
}