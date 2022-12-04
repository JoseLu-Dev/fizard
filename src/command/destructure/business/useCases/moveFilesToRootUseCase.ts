import { Service } from "typedi"

import { FileWrapper } from "../../../../common/business/fileWrapper"

@Service()
export class MoveFilesToRootUseCase {

    constructor() { }

    move(files: Array<FileWrapper>, root: string): void {
        files.forEach(file => {
            this._moveFileToRoot(file, root)
        })
    }

    private _moveFileToRoot(file: FileWrapper, root: string): void {
        file.pathNew = root
    }

}