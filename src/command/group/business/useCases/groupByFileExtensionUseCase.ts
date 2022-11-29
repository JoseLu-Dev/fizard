import { Service } from "typedi"

import { FileWrapper } from "../../../../common/business/fileWrapper"
import { FilePathUtils } from "../../../../common/business/utils/filePathUtils"

@Service()
export class GroupByFileExtensionUseCase {

    private readonly extensionTypes = {
        video: ['.mp4'],
        audio: ['.mp3'],
        image: ['.jpg', '.png'],
        text: ['.txt']
    }

    constructor(private readonly _filePathUtils: FilePathUtils) { }

    group(files: Array<FileWrapper>): void {

        files.forEach(file => {
            this._moveFileToItsFolder(file)
        })
    }

    private _moveFileToItsFolder(file: FileWrapper): void {

        const fileExtension: string = this._filePathUtils.getExtensionFromFilePath(file.pathNew)

        let group = this._getFileGroupFromFileExtension(fileExtension)

        file.pathNew = this._filePathUtils.moveFileToNewFolder(file.pathNew, group)
    }

    private _getFileGroupFromFileExtension(fileExtension: string): string {

        for (let [group, groupExtensions] of Object.entries(this.extensionTypes)) {
            if (groupExtensions.includes(fileExtension)) return group
        }

        return 'unknown'
    }


}