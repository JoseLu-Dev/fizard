import { Service } from "typedi"
import * as fs from "fs/promises"
import { Stats } from "fs"
import * as path from 'path'

@Service()
export class ReadFileStats {

    async read(filePath: string): Promise<Stats> {
        return await fs.stat(path.normalize(filePath))
    }

}