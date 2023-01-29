import { Command } from '@commander-js/extra-typings'
import { Service } from 'typedi'
import { FindDuplicatedFiles } from '../business/findDuplicatedFiles'
import { FindDuplicatesOptions } from '../business/findDuplicatesOptions'

@Service()
export class FindDuplicatesCommandDescription {

    constructor(
        private readonly _findDuplicatedFiles: FindDuplicatedFiles,
    ) { }

    /**
     * Defines and adds commands to a commander-js program
     * @param program commander-js program to add commands to
     */
    apply(program: Command, executionPath: string) {

        program
            .command('findDuplicates')
            .summary('Finds duplicate files')
            .option('-d, --delete-duplicates', 'Delete duplicated files')
            .action((options: FindDuplicatesOptions) => {
                return this._findDuplicatedFiles.execute({ path: executionPath, specificOptions: options, findOptions: { recursive: true } })
            })

    }
}