import * as path from 'path'
import { FileWrapper } from "../../../../../../src/common/business/fileWrapper"
import { GroupByFileExtensionUseCase } from "../../../../../../src/command/group/business/useCases/groupByFileExtensionUseCase"

const getFileTypeMock = jest.fn()
const getFileMimetypeMock = jest.fn()
const groupByFileExtension = new GroupByFileExtensionUseCase(
    {
        getFileType: getFileTypeMock,
        getFileMimetype: getFileMimetypeMock
    }
)

describe('group', () => {

    it('moves all video files to a "video" folder', async () => {

        const files = [
            new FileWrapper({ pathCurrent: 'downloads', name: 'example.mp4' })
        ]

        getFileTypeMock.mockReturnValue('video')

        groupByFileExtension.group(files)

        expect(files[0].pathNewComplete()).toBe(path.join('downloads', 'video', 'example.mp4'))
    })

})