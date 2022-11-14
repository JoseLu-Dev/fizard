import { Service } from "typedi"
import * as fs from "fs/promises"

import { FileWrapper } from "../fileWrapper";

@Service()
export class ReadFilesPropertiesUseCase {

    async read(files: Array<FileWrapper>): Promise<Array<FileWrapper>> {
        return await Promise.all(
            files.map(async file => {
                file.stats = await fs.stat(file.pathCurrent)
                return file
            })
        )
    }

}