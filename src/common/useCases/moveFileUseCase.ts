import * as fse from 'fs-extra'
import { Service } from "typedi"

@Service()
export class MoveFileUseCase {

    async move(src: string, dest: string): Promise<void> {
        try {
            fse.move(src, dest)
        } catch (err) {
            console.error(err)
        }
    }

}