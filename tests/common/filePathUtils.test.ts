import { FilePathUtils } from "../../src/common/filePathUtils"

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
