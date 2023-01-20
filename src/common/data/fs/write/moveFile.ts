import * as fse from 'fs-extra'
import { Service } from "typedi"
import { cli } from '../../../cli'

@Service()
export class MoveFile {

    async move(pathCurrent: string, pathNew: string): Promise<void> {
        try{
            return await fse.move(pathCurrent, pathNew)
        }
        catch(e){
            if(e instanceof Error){
                return cli.error(`Error moving "${pathCurrent}" to "${pathNew}" : ${e.message}`)
            }
            cli.error(`${e}`)
        }
    }

}