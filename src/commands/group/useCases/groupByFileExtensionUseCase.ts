import { Service } from "typedi"

import { FileWrapper } from "../../../common/fileWrapper"
import { FilePathUtils } from "../../../common/utils/filePathUtils"

@Service()
export class GroupByFileExtensionUseCase {

    private readonly extensionTypes = {
        video: ['.mp4'],
        audio: ['.mp3'],
        image: ['.jpg', '.png'],
        text: ['.txt']
    }

    private readonly REGEX_FILE_EXTENSION = /\..*/

    constructor(private readonly _filePathUtils: FilePathUtils) { }

    group(files: Array<FileWrapper>): void {
        files.forEach(file => {
            this._moveFileToItsFolder(file)
        })
    }

    private _moveFileToItsFolder(file: FileWrapper): void {
        if (!file.pathCurrent) return

        let fileExtension: RegExpMatchArray | null | undefined = file.pathCurrent.match(this.REGEX_FILE_EXTENSION)
        if (!fileExtension) return

        let group = this._getFileGroupFromFileExtension(fileExtension[0])

        file.pathNew = this._filePathUtils.moveFileToNewFolder(file.pathCurrent, group)
    }

    private _getFileGroupFromFileExtension(fileExtension: string): string {
        for (let [group, groupExtensions] of Object.entries(this.extensionTypes)) {
            if (groupExtensions.includes(fileExtension)) return group
        }

        return 'unknown'
    }


}