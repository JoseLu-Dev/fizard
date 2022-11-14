import * as fse from 'fs-extra'
import { Service } from "typedi"

import { FileWrapper } from '../fileWrapper'

@Service()
export class MoveFileUseCase {

    async move(files: Array<FileWrapper>): Promise<void> {

        files.map(file => {
            if (!file.pathNew) return

            try {
                fse.move(file.pathCurrent, file.pathNew)
            } catch (err) {
                console.error(err)
            }
        })
    }

}