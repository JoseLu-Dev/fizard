import * as fs from "fs/promises"
import { Service } from "typedi"

@Service()
export class DeleteFolder {

    async delete(filePath: string): Promise<void> {
        return await fs.rmdir(filePath)
    }

}