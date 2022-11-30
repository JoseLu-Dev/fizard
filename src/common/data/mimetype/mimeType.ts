import * as mime from 'mime-types'
import { Service } from 'typedi'

@Service()
export class MimeType{
    
    getFileMimetype(fileName: string): string{
        return mime.lookup(fileName) || 'unknown'
    }

    getFileType(fileName: string){
        return this.getFileMimetype(fileName).split('/')[0]
    }

}