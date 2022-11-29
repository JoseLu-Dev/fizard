import { Service } from "typedi";

import { CreateDir } from "../../data/fs/write/createDir";
import { CreateFile } from "../../data/fs/write/createFile";
import { MoveFile } from "../../data/fs/write/moveFile";
import { FileWrapper } from "../fileWrapper";

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