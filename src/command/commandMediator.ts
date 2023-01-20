import { Command } from '@commander-js/extra-typings'
import { Service } from 'typedi'

import { GroupFiles } from './group/business/groupFiles'
import { GroupOptions } from './group/business/groupOptions'
import { DestructureFolders } from './destructure/business/destructureFolders';
import { StructureCreate } from './structure/business/structureCreate';

@Service()
export class CommandMediator {

    constructor(
        private readonly _groupFiles: GroupFiles,
        private readonly _destructureFolders: DestructureFolders,
        private readonly _structureCreate: StructureCreate,
    ) { }

    /**
     * Defines and adds commands to a commander-js program
     * @param program commander-js program to add commands to
     */
    mediate(program: Command) {

        const executionPath = process.cwd()

        program
            .command('group')
            .description('Group files depending on flags')
            .option('-d, --date-created', 'By date created')
            .option('-e, --extension', 'By extension type')
            .action((options: GroupOptions) => {
                return this._groupFiles.execute({ path: executionPath, specificOptions: options })
            })

        program
            .command('destructure')
            .description('Moves all files under folder structure to the execution path')
            .action(() => {
                return this._destructureFolders.execute({ path: executionPath, findOptions: { recursive: true } })
            })

        program
            .command('structure <structure...>')
            .description('Creates a folder and file structure')
            .action((structure) => {
                return this._structureCreate.execute({ path: executionPath, specificOptions: {structure: structure} })
            })
    }
}