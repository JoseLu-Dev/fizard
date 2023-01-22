import { Command } from '@commander-js/extra-typings'
import { Service } from 'typedi'
import { DestructureCommandDescription } from './destructure/presentation/destructureCommandDescription';
import { StructureCommandDescription } from './structure/presentation/structureCommandDescription';
import { GroupCommandDescription } from './group/presentation/groupCommandDescription';

@Service()
export class CommandMediator {

    constructor(
        private readonly _groupCommandDescription: GroupCommandDescription,
        private readonly _destructureCommandDescription: DestructureCommandDescription,
        private readonly _structureCommandDescription: StructureCommandDescription,
    ) { }

    /**
     * Adds commands to a commander-js program defined in each command module
     * @param program commander-js program to add commands to
     */
    mediate(program: Command) {

        const executionPath = process.cwd()

        this._groupCommandDescription.apply(program, executionPath)
        this._destructureCommandDescription.apply(program, executionPath)
        this._structureCommandDescription.apply(program, executionPath)

    }
}