import { Service } from "typedi"
import * as path from 'path'

import { FileWrapper } from "../../../../common/business/fileWrapper"

@Service()
export class GroupByFileDateCreatedUseCase {

    constructor() { }

    group(files: Array<FileWrapper>, arg: string): void {
        files.forEach(file => {
            this._moveFileToItsFolder(file, arg)
        })
    }

    private _moveFileToItsFolder(file: FileWrapper, folderFormat: string): void {

        const folder = this._getFolderFromFileDate(file, folderFormat)

        file.pathNew = path.join(file.pathNew, folder)
    }

    private _getFolderFromFileDate(file: FileWrapper, folderFormat: string): string {

        if (!file.stats) return 'no-date'

        const modifiedTime: Date = file.stats.mtime

        return folderFormat
            .replace('YYYY', `${modifiedTime.getFullYear()}`)
            .replace('MM', `${modifiedTime.getMonth() + 1}`)
            .replace('DD', `${modifiedTime.getDate()}`)
    }

}