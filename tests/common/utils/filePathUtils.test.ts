import { FilePathUtils } from "../../../src/common/utils/filePathUtils"

const filePathUtils = new FilePathUtils()

describe('moveFileToNewFolder', () => {

    it('moves a file inside a folder', async () => {

        const movedFilePath = filePathUtils.moveFileToNewFolder('C:\\album\\photos\\photo.jpg', 'classified')

        expect(movedFilePath).toBe('C:\\album\\photos\\classified\\photo.jpg')
    })

    it('returns filePath if no folder is passed', async () => {

        expect(filePathUtils.moveFileToNewFolder('C:\\photo.jpg', '')).toBe('C:\\photo.jpg')
    })

    it('returns filePath if file is not inside any folder', async () => {

        expect(filePathUtils.moveFileToNewFolder('photo.jpg', 'newFolder')).toBe('photo.jpg')
    })

})

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
