import { Service } from "typedi"

import { FileWrapper } from "../../../../common/business/fileWrapper"

@Service()
export class MarkFilesToDeleteUseCase {

    constructor() { }

    mark(files: Array<FileWrapper>): void {
        files.forEach(file => {
            this._markFileToDelete(file)
        })
    }

    private _markFileToDelete(file: FileWrapper): void {
        file.isDeletedMarked = true
    }

}