import * as mime from 'mime-types'

export class MimeType{
    
    getFileMimetype(fileName: string): string{
        return mime.lookup(fileName) || 'unknown'
    }

    getFileType(fileName: string){
        return this.getFileMimetype(fileName).split('/')[0]
    }

}