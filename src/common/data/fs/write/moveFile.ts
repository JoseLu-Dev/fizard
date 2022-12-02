import * as fse from 'fs-extra'
import { Service } from "typedi"

@Service()
export class MoveFile {

    async move(pathCurrent: string, pathNew: string): Promise<void> {
        return await fse.move(pathCurrent, pathNew)
    }

}