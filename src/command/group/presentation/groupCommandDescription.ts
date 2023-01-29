import { Command } from '@commander-js/extra-typings'
import { Service } from 'typedi'
import { GroupFiles } from '../business/groupFiles'

@Service()
export class GroupCommandDescription {

    dateFormatRegex = /(YYYY|MM|DD)/;

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
            .summary('Group files depending on flags')
            .option('-d, --date-created <format>', 'By date created', undefined)
            .option('-e, --extension', 'By extension type')
            .action((options) => {
                this._validateInput(options)
                return this._groupFiles.execute({ path: executionPath, specificOptions: options })
            })

    }

    private _validateInput(options: {
        dateCreated: string | boolean | [] | string[],
        extension?: true | undefined
    }) {
        this._validateDateCreated(options.dateCreated)
    }

    private _validateDateCreated(dateCreated: string | boolean | [] | string[]) {
        if (dateCreated == undefined) return
        if (typeof dateCreated != 'string') throw new Error('Type of dateCreated param is not valid')
        if (!dateCreated.match(this.dateFormatRegex)) throw new Error('Date parameter string must contain YYYY, MM or DD')
    }

}


