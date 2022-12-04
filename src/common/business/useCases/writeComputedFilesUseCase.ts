import { Service } from "typedi";

import { CreateDir } from "../../data/fs/write/createDir";
import { CreateFile } from "../../data/fs/write/createFile";
import { MoveFile } from "../../data/fs/write/moveFile";
import { FileWrapper } from "../fileWrapper";
import { DeleteFile } from '../../data/fs/write/deleteFile';

@Service()
export class WriteComputedFilesUseCase {

    constructor(
        private readonly _createDir: CreateDir,
        private readonly _createFile: CreateFile,
        private readonly _moveFile: MoveFile,
        private readonly _deleteFile: DeleteFile,
    ) { }


    async write(files: Array<FileWrapper>): Promise<void[]> {
        return Promise.all(files.map(file => this._performFileWrite(file)))
    }

    private async _performFileWrite(file: FileWrapper): Promise<void> {
        if(file.isDeletedMarked)
            return this._deleteFile.delete(file.pathCurrentComplete())

        if (!file.isNew)
            return this._moveFile.move(file.pathCurrentComplete(), file.pathNewComplete())

        if (file?.stats?.isFile())
            return this._createFile.create(file.pathNewComplete())

        if (file?.stats?.isDirectory())
            return this._createDir.create(file.pathNewComplete())
    }

}