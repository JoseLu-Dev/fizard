import * as fse from 'fs-extra'
import * as path from 'path'
import { Service } from "typedi"

@Service()
export class CreateDir {

    async create(dir: string): Promise<void> {
        return await fse.ensureDir(path.normalize(dir))
    }

}