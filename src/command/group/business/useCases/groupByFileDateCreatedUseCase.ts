import { Service } from "typedi"

import { FileWrapper } from "../../../../common/business/fileWrapper"
import { FilePathUtils } from "../../../../common/business/utils/filePathUtils"

@Service()
export class GroupByFileDateCreatedUseCase {

    constructor(private readonly _filePathUtils: FilePathUtils) { }

    group(files: Array<FileWrapper>): void {
        files.forEach(file => {
            this._moveFileToItsFolder(file)
        })
    }

    private _moveFileToItsFolder(file: FileWrapper): void {

        const folder = this._getFolderFromFileDate(file)

        file.pathNew = this._filePathUtils.moveFileToNewFolder(file.pathNew, folder)
    }

    private _getFolderFromFileDate(file: FileWrapper): string {

        if(!file.stats) return 'no-date'

        const modifiedTime: Date = file.stats.mtime
        return `${modifiedTime.getFullYear()}-${modifiedTime.getMonth() + 1}-${modifiedTime.getDate()}`
    }

}