import { FileWrapper } from "../../../../../../src/common/business/fileWrapper"
import { GroupByFileExtensionUseCase } from "../../../../../../src/command/group/business/useCases/groupByFileExtensionUseCase"

const mockedMoveFileToNewFolder = jest.fn()
const getExtensionFromFilePath = jest.fn()
const groupByFileExtension = new GroupByFileExtensionUseCase(
    {
        moveFileToNewFolder: mockedMoveFileToNewFolder,
        getExtensionFromFilePath: getExtensionFromFilePath,
    }
)

describe('group', () => {

    it('moves all video files to a "video" folder', async () => {

        const files = [
            {
                pathCurrent: 'downloads\\example.mp4',
                pathNew: 'downloads\\example.mp4',
            }
        ]

        getExtensionFromFilePath.mockImplementation(() => '.mp4')

        mockedMoveFileToNewFolder.mockImplementation((path, group) => {
            expect(path).toBe('downloads\\example.mp4')
            expect(group).toBe('video')

            return 'downloads\\video\\example.mp4'
        })

        groupByFileExtension.group(files)

        expect(files[0].pathNew).toBe('downloads\\video\\example.mp4')
    })

    it('moves all unknown files to a "unknown" folder', async () => {

        const files = [
            {
                pathCurrent: 'downloads\\example.unknown',
                pathNew: 'downloads\\example.unknown',
            }
        ]

        getExtensionFromFilePath.mockImplementation(() => '.unknown')

        mockedMoveFileToNewFolder.mockImplementation((path, group) => {
            expect(group).toBe('unknown')
            return 'downloads\\unknown\\example.unknown'
        })

        groupByFileExtension.group(files)

        expect(mockedMoveFileToNewFolder).toHaveBeenCalled()

        expect(files[0].pathNew).toBe('downloads\\unknown\\example.unknown')
    })

    it('moves all files with no extension to a "unknown" folder', async () => {

        const files = [
            {
                pathCurrent: 'folder\\no-extension-file',
                pathNew: 'folder\\no-extension-file'
            }
        ]

        getExtensionFromFilePath.mockImplementation(() => '')

        mockedMoveFileToNewFolder.mockImplementation((path, group) => {
            expect(group).toBe('unknown')
            return 'folder\\unknown\\no-extension-file'
        })

        groupByFileExtension.group(files)

        expect(files[0].pathNew).toBe('folder\\unknown\\no-extension-file')
    })

})