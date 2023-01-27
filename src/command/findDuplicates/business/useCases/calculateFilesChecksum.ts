import { Service } from "typedi"

import { FileWrapper } from "../../../../common/business/fileWrapper"
import { CalculateFileChecksum } from "../../data/calculateFileChecksum"

@Service()
export class CalculateFilesChecksum {

    constructor(private readonly _calculateFileChecksum: CalculateFileChecksum) { }

    calculate(files: Array<FileWrapper>): void {

        files.forEach(file => {
            this._calculateFilesChecksum(file)
        })
    }

    private _calculateFilesChecksum(file: FileWrapper): void {
        file.hash = this._calculateFileChecksum.calculate(file.pathCurrentComplete())
    }

}