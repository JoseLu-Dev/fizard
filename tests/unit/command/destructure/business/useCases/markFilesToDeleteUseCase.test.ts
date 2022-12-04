import * as path from 'path'
import { FileWrapper } from "../../../../../../src/common/business/fileWrapper"
import { MarkFilesToDeleteUseCase } from '../../../../../../src/command/destructure/business/useCases/markFilesToDeleteUseCase';


const markFilesToDelete = new MarkFilesToDeleteUseCase()


describe('mark', () => {

    it('marks all files to delete', async () => {

        const files = [
            new FileWrapper({ pathCurrent: 'downloads', name: 'example.mp4' }),
            new FileWrapper({ pathCurrent: 'downloads', name: 'example.mp4' }),
            new FileWrapper({ pathCurrent: 'downloads', name: 'example.mp4' }),
            new FileWrapper({ pathCurrent: 'downloads', name: 'example.mp4' }),
        ]

        markFilesToDelete.mark(files)

        for (const file of files) {
            expect(file.isDeletedMarked).toBe(true)
        }
    })

})