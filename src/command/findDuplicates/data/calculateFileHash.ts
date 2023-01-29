import { Service } from "typedi"
import * as md5 from 'md5-file';
import { cli } from "../../../common/cli"

@Service()
export class CalculateFileHash {

    calculate(dir: string): string {
        try {
            return md5.sync(dir)
        }
        catch (e) {
            if (e instanceof Error) {
                cli.error(`Error calculating checksum of file: "${dir}" : ${e.message}`)
                return ''
            }
            cli.error(`${e}`)
            return ''
        }
    }

}