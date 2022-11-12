import { File } from "../../../../src/common/file";
import { GroupByFileExtensionUseCase } from "../../../../src/commands/group/useCases/groupByFileExtensionUseCase"

const mockedMoveFileToNewFolder = jest.fn()
const groupByFileExtension = new GroupByFileExtensionUseCase({moveFileToNewFolder: mockedMoveFileToNewFolder})

describe('group', () => {

    it('moves all video files to a "video" folder', async () => {

        const files = [
            {
                pathCurrent: 'downloads\\example.mp4',
            }
        ] as Array<File>

        mockedMoveFileToNewFolder.mockImplementation((path, group)=>{
            expect(path).toBe('downloads\\example.mp4')
            expect(group).toBe('video')
            
            return 'downloads\\video\\example.mp4'
        })

        groupByFileExtension.group(files)
        
        files.forEach(element => {
          expect(element.pathNew).toBe('downloads\\video\\example.mp4')
        })
    })

    it('moves all unknown files to a "unknown" folder', async () => {

        const files = [
            {
                pathCurrent: 'downloads\\example.unknown',
            },
            {
                pathCurrent: 'downloads\\example.bye',
            }
        ] as Array<File>

        mockedMoveFileToNewFolder.mockImplementation((path, group)=>{
            expect(group).toBe('unknown')
        })

        groupByFileExtension.group(files)
    })

    it('does nothing when pathCurrent is falsy', async () => {

        const files = [
            {
                
            },
            {
                pathCurrent: null
            },
            {
                pathCurrent: undefined
            }
        ] as Array<File>

        groupByFileExtension.group(files)

        files.forEach(element => {
            expect(element.pathNew).toBeFalsy()
        })
    })

    it('does nothing when file has no extension', async () => {

        const files = [
            {
                pathCurrent: 'folder/no-extension-file'
            }
        ] as Array<File>

        groupByFileExtension.group(files)

        files.forEach(element => {
            expect(element.pathNew).toBeFalsy()
        })
    })

})