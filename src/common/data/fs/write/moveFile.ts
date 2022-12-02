import * as fse from 'fs-extra'
import path from 'path'
import { Service } from "typedi"

@Service()
export class MoveFile {

    async move(pathCurrent: string, pathNew: string): Promise<void> {
        return await fse.move(path.normalize(pathCurrent), path.normalize(pathNew))
    }

}