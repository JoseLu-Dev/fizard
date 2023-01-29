import { Service } from "typedi"

import { FileWrapper } from "../../../../common/business/fileWrapper"
import { CalculateFileHash } from "../../data/calculateFileHash"

@Service()
export class CalculateFilesHash {

    constructor(private readonly _calculateFileChecksum: CalculateFileHash) { }

    calculate(files: Array<FileWrapper>, onHashCalculated: (fileNumber: number) => void): void {

        files.forEach((file, index) => {
            this._calculateFilesHash(file)
            onHashCalculated(index)
        })
    }

    private _calculateFilesHash(file: FileWrapper): void {
        file.hash = this._calculateFileChecksum.calculate(file.pathCurrentComplete())
    }

}