import { Service } from "typedi"

import { FileWrapper } from "../../../../common/business/fileWrapper"
import { MimeType } from "../../../../common/data/mimetype/mimeType"

@Service()
export class GroupByFileExtensionUseCase {

    constructor(private readonly _mimeType: MimeType) { }

    group(files: Array<FileWrapper>): void {

        files.forEach(file => {
            this._moveFileToItsFolder(file)
        })
    }

    private _moveFileToItsFolder(file: FileWrapper): void {
        
        const fileType = this._mimeType.getFileType(file.name)

        file.pathNew = `${file.pathNew}\\${fileType}`
    }

}