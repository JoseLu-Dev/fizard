import * as fse from 'fs-extra'
import { Service } from "typedi"
import { cli } from '../../../cli';

@Service()
export class CreateFile {

    async create(dir: string): Promise<void> {
        try {
            return await fse.ensureFile(dir)
        }
        catch (e) {
            if (e instanceof Error) {
                return cli.error(`Error creating file: "${dir}" : ${e.message}`)
            }
            cli.error(`${e}`)
        }
    }

}