import * as fse from 'fs-extra'
import { Service } from "typedi"
import { cli } from '../../../cli';

@Service()
export class CreateDir {

    async create(dir: string): Promise<void> {
        try {
            return await fse.ensureDir(dir)
        }
        catch (e) {
            if (e instanceof Error) {
                return cli.error(`Error creating folder: "${dir}" : ${e.message}`, e)
            }
            cli.error(`Error creating folder: "${dir}" : ${e}`, new Error(`${e}`))
        }
    }

}