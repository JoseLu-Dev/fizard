import { Service } from "typedi"
import * as fs from "fs/promises"
import { Stats } from "fs"

@Service()
export class ReadFileStats {

    async read(path: string): Promise<Stats> {
        return await fs.stat(path)
    }

}