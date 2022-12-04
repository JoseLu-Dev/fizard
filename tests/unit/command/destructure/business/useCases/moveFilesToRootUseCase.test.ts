import * as path from 'path'
import { FileWrapper } from "../../../../../../src/common/business/fileWrapper"
import { MoveFilesToRootUseCase } from '../../../../../../src/command/destructure/business/useCases/moveFilesToRootUseCase';


const moveFilesToRootUseCase = new MoveFilesToRootUseCase()


describe('move', () => {

    it('Moves files to root folder', async () => {

        const root = 'rootFolder'

        const files = [
            new FileWrapper({ pathCurrent: 'downloads', name: 'example.mp4' }),
            new FileWrapper({ pathCurrent: 'downloads', name: 'example.mp4' }),
            new FileWrapper({ pathCurrent: 'downloads', name: 'example.mp4' }),
            new FileWrapper({ pathCurrent: 'downloads', name: 'example.mp4' }),
        ]

        moveFilesToRootUseCase.move(files, root)

        for (const file of files) {
            expect(file.pathNew).toBe(root)
        }
    })

})