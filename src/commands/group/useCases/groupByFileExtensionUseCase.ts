import { File } from "../../../common/file";
import { FilePathUtils } from "../../../common/filePathUtils";

export class GroupByFileExtensionUseCase {

    private readonly _filePathUtils: FilePathUtils

    private readonly extensionTypes = {
        video: ['.mp4'],
        audio: ['.mp3'],
        image: ['.jpg', '.png'],
        text: ['.txt']
    }

    private readonly REGEX_FILE_EXTENSION = /\..*/

    constructor (){
        this._filePathUtils = new FilePathUtils()
    }

    group(files: Array<File>): void {
        files.forEach(file => {
            this._moveFileToItsFolder(file)
        })
    }

    private _moveFileToItsFolder(file: File): void {
        if(!file.pathCurrent) return

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