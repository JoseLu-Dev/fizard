import * as fse from 'fs-extra'
import * as path from 'path'
import { Service } from "typedi"

@Service()
export class CreateFile {

    async create(dir: string): Promise<void> {
        return await fse.ensureFile(path.normalize(dir))
    }

}