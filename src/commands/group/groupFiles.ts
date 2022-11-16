import { Service } from "typedi"

import { GroupOptions } from "./groupOptions"
import { FileWrapper } from "../../common/fileWrapper"
import { GetFilesWithPropertiesUseCase } from "../../common/useCases/getFilesWithPropertiesUseCase"
import { GroupByFileExtensionUseCase } from "./useCases/groupByFileExtensionUseCase"
import { MoveFileUseCase } from "../../common/useCases/moveFileUseCase"
import { GroupByFileDateCreatedUseCase } from "./useCases/groupByFileDateCreatedUseCase"

@Service()
export class GroupFiles {

    readonly options = {
        extension: this._groupByFileExtensionUseCase,
        dateCreated: this._groupByFileDateCreatedUseCase,
    }

    constructor(
        private readonly _getFilesMetadataUseCase: GetFilesWithPropertiesUseCase,
        private readonly _groupByFileExtensionUseCase: GroupByFileExtensionUseCase,
        private readonly _groupByFileDateCreatedUseCase: GroupByFileDateCreatedUseCase,
        private readonly _moveFileUseCase: MoveFileUseCase,
    ) { }

    async performGroup(path: string, options: GroupOptions) {

        const files: Array<FileWrapper> = await this._getFilesMetadataUseCase.getList(path)

        this._groupForEachOption(options, files)

        this._moveFileUseCase.move(files)
    }

    private _groupForEachOption(options: GroupOptions, files: Array<FileWrapper>){

        type ObjectKey = keyof typeof this.options

        for (const option in options) {
            this.options[option as ObjectKey].group(files)
        }
    }
}