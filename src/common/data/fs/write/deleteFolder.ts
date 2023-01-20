import * as fs from "fs/promises"
import { Service } from "typedi"
import { cli } from '../../../cli';

@Service()
export class DeleteFolder {

    async delete(filePath: string): Promise<void> {
        try {
            return await fs.rmdir(filePath)
        }
        catch (e) {
            if (e instanceof Error) {
                return cli.error(`Error deleting folder: "${filePath}" : ${e.message}`)
            }
            cli.error(`${e}`)
        }
    }

}