import * as fs from "fs/promises"
import { Service } from "typedi"
import { cli } from '../../../cli';

@Service()
export class DeleteFile {

    async delete(filePath: string): Promise<void> {
        try {
            return await fs.unlink(filePath)
        }
        catch (e) {
            if (e instanceof Error) {
                return cli.error(`Error deleting file: "${filePath}" : ${e.message}`)
            }
            cli.error(`${e}`)
        }
    }

}