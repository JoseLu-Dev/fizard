import * as fs from "fs/promises"
import path from "path"
import { Service } from "typedi"

@Service()
export class ListFilesUnderDirectory {

    async list(dir: string): Promise<string[]> {
        return await fs.readdir(path.normalize(dir))
    }

}