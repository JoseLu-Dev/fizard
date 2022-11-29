import { MimeType } from '../../../../src/common/data/mimetype/mimeType';

const mimetype = new MimeType()

describe('getFileMimetype', () => {

    it('returns file mimetype', async () => {
        expect(mimetype.getFileMimetype('config.json')).toBe('application/json')
        expect(mimetype.getFileMimetype('index.html')).toBe('text/html')
    })

})

describe('getFileType', () => {

    it('returns file type', async () => {
        expect(mimetype.getFileType('config.json')).toBe('application')
        expect(mimetype.getFileType('index.html')).toBe('text')
    })

})