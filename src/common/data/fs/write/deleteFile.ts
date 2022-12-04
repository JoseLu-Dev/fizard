import * as fs from "fs/promises"
import { Service } from "typedi"

@Service()
export class DeleteFile {

    async delete(filePath: string): Promise<void> {
        return await fs.unlink(filePath)
    }

}