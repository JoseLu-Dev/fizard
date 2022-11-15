import { Service } from "typedi"
import { FileWrapper } from "../fileWrapper";

@Service()
export class FileObjectMapper {

    fromPathList(filePaths: Array<string>): Array<FileWrapper> {
        return filePaths.map(filePath => new FileWrapper({ pathCurrent: filePath, pathNew: filePath }))
    }

}