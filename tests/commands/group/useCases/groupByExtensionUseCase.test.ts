import { File } from "../../../../src/common/file";
import { GroupByFileExtensionUseCase } from "../../../../src/commands/group/useCases/groupByFileExtensionUseCase"

const files = [
    {
        pathCurrent: 'downloads\\example.mp4',
    }
] as Array<File>

const groupByFileExtension = new GroupByFileExtensionUseCase()

describe('group', () => {

    it('moves all video files to a "video" folder', async () => {
        groupByFileExtension.group(files)
        
        files.forEach(element => {
          expect(element.pathNew?.match(/.*\\video\\[^/]*\.mp4/)).toHaveLength(1)
        })
    })

})