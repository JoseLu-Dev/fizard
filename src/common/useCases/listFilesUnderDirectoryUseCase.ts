import * as fs from "fs/promises"
import { Service } from "typedi"

@Service()
export class ListFilesUnderDirectoryUseCase {

    async list(dir: string): Promise<string[]> {
        return (await fs.readdir(dir)).map(e => `${dir}\\${e}`)
    }

}