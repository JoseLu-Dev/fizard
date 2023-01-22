import { Service } from "typedi"
import * as fs from "fs/promises"
import { Stats } from "fs"

@Service()
export class ReadFileStats {

    async read(filePath: string): Promise<Stats> {
        return await fs.stat(filePath)
    }

}