const moveMock = jest.fn()
jest.mock('fs-extra', () => ({
    move: moveMock
}))

import { MoveFile } from '../../../../../../src/common/data/fs/write/moveFile';
const moveFile: MoveFile = new MoveFile()

describe('move', () => {
    
    it('return a stats object of the file', async () => {
        
        await moveFile.move('C:\\temp\\image.jpeg', 'C:\\temp\\images\\file.jpeg')

        expect(moveMock).toHaveBeenCalledWith('C:\\temp\\image.jpeg', 'C:\\temp\\images\\file.jpeg')
    })

})
