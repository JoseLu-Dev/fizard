import { FileObjectMapper } from "../../../src/common/mappers/fileObjectMapper"
import { FileWrapper } from "../../../src/common/fileWrapper"

const fileObjectMapper = new FileObjectMapper()

describe('fromPathList', () => {

    it('maps a list of file paths to a list of files', async () => {

        const pathList: Array<string> = ['path1', 'path2', 'path3']

        const filesFiltered = fileObjectMapper.fromPathList(pathList)

        expect(filesFiltered).toBeInstanceOf(Array<FileWrapper>)

        filesFiltered.forEach((file, index) => {
            expect(file.pathCurrent).toBe(pathList[index])
        })
    })

})
