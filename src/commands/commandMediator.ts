import { Command } from '@commander-js/extra-typings';
import { GroupFiles } from './group/groupFiles';
import { GroupOptions } from './group/groupOptions';

export class CommandMediator {

    /**
     * Defines and adds commands to a commander-js program
     * @param program commander-js program to add commands to
     */
    mediate(program: Command) {

        program
            .command('group')
            .description('Group files depending on flags')
            .option('-d, --date-created', 'By date created')
            .option('-e, --extension', 'By extension type')
            .action((options: GroupOptions) => {
                new GroupFiles().performGroup(options)
            })
    }
}