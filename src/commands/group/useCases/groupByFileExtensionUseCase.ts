import { File } from "../../../common/file";

export class GroupByFileExtensionUseCase {

    private readonly extensionTypes = {
        video: ['.mp4'],
        audio: ['.mp3'],
        image: ['.jpg', '.png'],
        text: ['.txt']
    }

    private readonly REGEX_FILE_EXTENSION = /\..*/

    group(files: Array<File>): void {
        files.forEach(file => {
            this.moveFileToItsFolder(file)
        })
    }

    moveFileToItsFolder(file: File) {
        if(!file.pathCurrent) return

        let fileExtension: RegExpMatchArray | null | undefined = file.pathCurrent.match(this.REGEX_FILE_EXTENSION)
        if (!fileExtension) return

        let group = this.getFileGroupFromFileExtension(fileExtension[0])

        file.pathNew = this.getFilePathInsideFileFolder(file.pathCurrent, group)
    }

    getFileGroupFromFileExtension(fileExtension: string): string {
        for (let [group, groupExtensions] of Object.entries(this.extensionTypes)) {
            if (groupExtensions.includes(fileExtension)) return group
        }

        return 'unknown'
    }

    getFilePathInsideFileFolder(filePath: string, folder: string): string{
        let folders = filePath.split('/')
        if(!folders || !folders.length) return filePath

        let fileName = folders.pop()
        folders.push(folder)
        folders.push(fileName as string)

        return folders.join('/')
    }
}