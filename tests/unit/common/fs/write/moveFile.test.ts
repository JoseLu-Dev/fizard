const moveMock = jest.fn()
jest.mock('fs-extra', () => ({
    move: moveMock
}))

import { MoveFile } from "../../../../../src/common/fs/write/moveFile"
const readFileStats: MoveFile = new MoveFile()

describe('list', () => {
    
    it('return a stats object of the file', async () => {
        
        await readFileStats.move('C:\\temp\\image.jpeg', 'C:\\temp\\images\\file.jpeg')

        expect(moveMock).toHaveBeenCalledWith('C:\\temp\\image.jpeg', 'C:\\temp\\images\\file.jpeg')
    })

})
