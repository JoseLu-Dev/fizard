import { FilePathUtils } from '../../../../../src/common/business/utils/filePathUtils';


const filePathUtils = new FilePathUtils()

describe('getExtensionFromFilePath', () => {

    it('returns extension from file path', async () => {

        expect(filePathUtils.getExtensionFromFilePath('photo.jpg')).toBe('.jpg')
    })

    it('returns empty string if extension is not found', async () => {

        expect(filePathUtils.getExtensionFromFilePath('photos\\photo')).toBe('')
    })

    it('returns last extension if file like a.ts.txt', async () => {

        expect(filePathUtils.getExtensionFromFilePath('code.ts.txt')).toBe('.txt')
    })

    it('returns extension if file is inside a .extension folder', async () => {

        expect(filePathUtils.getExtensionFromFilePath('folder\\.extension\\code.txt')).toBe('.txt')
    })

})
