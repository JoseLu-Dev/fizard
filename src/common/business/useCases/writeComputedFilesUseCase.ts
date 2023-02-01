import { Service } from "typedi";

import { CreateDir } from "../../data/fs/write/createDir";
import { CreateFile } from "../../data/fs/write/createFile";
import { MoveFile } from "../../data/fs/write/moveFile";
import { FileWrapper } from "../fileWrapper";
import { DeleteFile } from '../../data/fs/write/deleteFile';
import { DeleteFolder } from "../../data/fs/write/deleteFolder";

@Service()
export class WriteComputedFilesUseCase {

    constructor(
        private readonly _createDir: CreateDir,
        private readonly _createFile: CreateFile,
        private readonly _moveFile: MoveFile,
        private readonly _deleteFile: DeleteFile,
        private readonly _deleteFolder: DeleteFolder,
    ) { }


    async write(files: FileWrapper[], onFileWritten: (index: number) => void): Promise<void> {
        return files.reduce((accumulatorPromise, file) => {
            return accumulatorPromise.then(() => {
                onFileWritten(files.indexOf(file) + 1)
                return this._performFileWrite(file);
            });
        }, Promise.resolve());
    }

    private async _performFileWrite(file: FileWrapper): Promise<void> {

        if (file.isDeletedMarked) {
            return this._delete(file)
        }

        if (!file.isNew && file.pathCurrentComplete() !== file.pathNewComplete())
            return this._moveFile.move(file.pathCurrentComplete(), file.pathNewComplete())

        if (file?.stats?.isFile())
            return this._createFile.create(file.pathNewComplete())

        if (file?.stats?.isDirectory())
            return this._createDir.create(file.pathNewComplete())
    }

    private async _delete(file: FileWrapper): Promise<void> {
        if (file?.stats?.isFile()) {
            return this._deleteFile.delete(file.pathCurrentComplete())
        }
        return this._deleteFolder.delete(file.pathCurrentComplete())
    }

}