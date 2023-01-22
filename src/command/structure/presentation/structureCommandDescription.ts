import { Command } from '@commander-js/extra-typings'
import { Service } from 'typedi'
import { StructureCreate } from '../business/structureCreate'

@Service()
export class StructureCommandDescription {

    constructor(
        private readonly _structureCreate: StructureCreate,
    ) { }

    /**
     * Defines and adds commands to a commander-js program
     * @param program commander-js program to add commands to
     */
    apply(program: Command, executionPath: string) {

        program
            .command('structure')
            .option('-s --structure <structure...>')
            .description('Creates a folder and file structure')
            .action((options) => {
                return this._structureCreate.execute({ path: executionPath, specificOptions: options })
            })

    }
}