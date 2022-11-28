import { Service } from "typedi";

import { FileWrapper } from "../fileWrapper"
import { CreateDir } from "../fs/write/createDir";
import { CreateFile } from "../fs/write/createFile";
import { MoveFile } from "../fs/write/moveFile";

@Service()
export class WriteComputedFilesUseCase {

    constructor(
        private readonly _createDir: CreateDir,
        private readonly _createFile: CreateFile,
        private readonly _moveFile: MoveFile,
    ) { }


    async write(files: Array<FileWrapper>): Promise<void[]> {
        return Promise.all(files.map(file => this._performFileWrite(file)))
    }

    private async _performFileWrite(file: FileWrapper): Promise<void> {
        if (!file.isNew)
            return this._moveFile.move(file.pathCurrentComplete(), file.pathNewComplete())

        if (file?.stats?.isFile())
            return this._createFile.create(file.pathNewComplete())

        if (file?.stats?.isDirectory())
            return this._createDir.create(file.pathNewComplete())
    }

}