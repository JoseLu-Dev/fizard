import { Service } from "typedi";

import { GroupOptions } from "./groupOptions";
import { GroupByFileExtensionUseCase } from "./useCases/groupByFileExtensionUseCase";

@Service()
export class GroupFiles {

    constructor(private readonly _groupByFileExtensionUseCase: GroupByFileExtensionUseCase) { }

    performGroup(path: string, options: GroupOptions) {

    }
}