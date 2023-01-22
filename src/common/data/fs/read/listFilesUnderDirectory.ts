import * as fs from "fs/promises"
import { Service } from "typedi"
import { cli } from '../../../cli';

@Service()
export class ListFilesUnderDirectory {

    async list(dir: string): Promise<string[]> {
        try {
            return await fs.readdir(dir)
        }
        catch (e) {
            if (e instanceof Error) {
                cli.error(`Error listing files under dir: "${dir}" : ${e.message}`)
                return []
            }
            cli.error(`${e}`)
            return []
        }
    }

}