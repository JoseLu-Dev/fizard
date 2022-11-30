import { Service } from 'typedi';

@Service()
export class FilePathUtils{

    private static readonly REGEX_FILE_EXTENSION = /\.[^.]+$/

    /**
     * Returns the file extension from a file path
     * 
     * @param filePath path where the file is located
     * @returns file extension
     */
    getExtensionFromFilePath(filePath: string): string {

        let fileExtension: string | undefined = filePath.match(FilePathUtils.REGEX_FILE_EXTENSION)?.pop()
        if(!fileExtension) return ''
        return fileExtension
    }
}