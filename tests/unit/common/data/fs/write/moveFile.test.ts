const moveMock = jest.fn()
jest.mock('fs-extra', () => ({
    move: moveMock
}))

jest.mock('../../../../../../src/common/cli.ts')

import { MoveFile } from '../../../../../../src/common/data/fs/write/moveFile';
const moveFile: MoveFile = new MoveFile()

describe('move', () => {
    
    it('calls move method with given dir paths', async () => {
        
        await moveFile.move('C:\\temp\\image.jpeg', 'C:\\temp\\images\\file.jpeg')

        expect(moveMock).toHaveBeenCalledWith('C:\\temp\\image.jpeg', 'C:\\temp\\images\\file.jpeg')
    })

    it('catches error thrown in move function', async () => {

        moveMock.mockImplementation(() => { throw new Error() })

        await moveFile.move('', '')
    })
})
