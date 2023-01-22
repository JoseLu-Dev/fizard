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
            .command('structure <structure...>')
            .summary('Creates a folder and file structure')
            .description(
                'Creates a folder and file structure\n\n' +
                'Example: structure feature-user business-data-presentation-file.properties\n' +
                'Result: \n' +
                '├───feature\n' +
                '│   ├───business\n' +
                '│   ├───data\n' +
                '│   ├───presentation\n' +
                '│   └───file.properties\n' +
                '└───user\n' +
                '    ├───business\n' +
                '    ├───data\n' +
                '    ├───presentation\n' +
                '    └───file.properties'
            )
            .action((structure) => {
                return this._structureCreate.execute({ path: executionPath, specificOptions: { structure: structure } })
            })

    }
}