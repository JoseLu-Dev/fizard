import { Stats } from "fs"
import { GroupByFileDateCreatedUseCase } from "../../../../../../src/command/group/business/useCases/groupByFileDateCreatedUseCase"

const mockedMoveFileToNewFolder = jest.fn()
const groupByFileExtension = new GroupByFileDateCreatedUseCase({
    moveFileToNewFolder: mockedMoveFileToNewFolder,
    getExtensionFromFilePath: () => ''
})

describe('group', () => {

    it('moves files to a year-month-day folder', async () => {

        const files = [
            {
                pathCurrent: 'downloads\\example.mp4',
                pathNew: 'downloads\\example.mp4',
                stats: {
                    mtime: new Date(2022, 10, 3)
                } as Stats
            }
        ]

        mockedMoveFileToNewFolder.mockImplementation((path, group) => {
            expect(path).toBe('downloads\\example.mp4')
            expect(group).toBe('2022-11-3')

            return 'downloads\\2022-11-3\\example.mp4'
        })

        groupByFileExtension.group(files)

        expect(files[0].pathNew).toBe('downloads\\2022-11-3\\example.mp4')
    })

    it('moves files to a no-date when FileWrapper has no stats', async () => {

        const files = [
            {
                pathCurrent: 'downloads\\example.mp4',
                pathNew: 'downloads\\example.mp4'
            }
        ]

        mockedMoveFileToNewFolder.mockReset()

        groupByFileExtension.group(files)

        expect(mockedMoveFileToNewFolder).toHaveBeenCalledWith('downloads\\example.mp4', 'no-date')
    })

})