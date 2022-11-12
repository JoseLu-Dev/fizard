import { Service } from 'typedi';

@Service()
export class FilePathUtils{

    /**
     * Returns modified path of the file moved inside a folder
     * 
     * @param filePath path of the file
     * @param folder new folder
     * @returns modified path
     */
    moveFileToNewFolder(filePath: string, folder: string): string{

        if(!folder) return filePath

        let folders = filePath.split('\\')
        if(!folders || folders.length == 1) return filePath

        let fileName = folders.pop()
        folders.push(folder)
        folders.push(fileName as string)

        return folders.join('\\')
    }
}