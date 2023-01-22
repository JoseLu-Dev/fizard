import { Command } from '@commander-js/extra-typings'
import { Service } from 'typedi'
import { GroupFiles } from '../business/groupFiles'
import { GroupOptions } from '../business/groupOptions'

@Service()
export class GroupCommandDescription {

    constructor(
        private readonly _groupFiles: GroupFiles,
    ) { }

    /**
     * Defines and adds commands to a commander-js program
     * @param program commander-js program to add commands to
     */
    apply(program: Command, executionPath: string) {

        program
            .command('group')
            .description('Group files depending on flags')
            .option('-d, --date-created', 'By date created')
            .option('-e, --extension', 'By extension type')
            .action((options: GroupOptions) => {
                return this._groupFiles.execute({ path: executionPath, specificOptions: options })
            })

    }
}