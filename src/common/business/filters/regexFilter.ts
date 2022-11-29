import { Service } from "typedi"
import { FileWrapper } from "../fileWrapper"

@Service()
export class RegexFilter {

    textList(textList: Array<string>, regex: string) {
        return textList.filter(text => new RegExp(regex).test(text))
    }

    filePathCurrent(files: Array<FileWrapper>, regex: string) {
        return files.filter(file => new RegExp(regex).test(file.pathCurrentComplete()))
    }

}