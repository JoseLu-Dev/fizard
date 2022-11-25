const statMock = jest.fn()
jest.mock('fs/promises', () => ({
    stat: statMock
}))

import { ReadFileStats } from "../../../../../src/common/fs/read/readFileStats"
const readFileStats: ReadFileStats = new ReadFileStats()

describe('list', () => {
    
    it('return a stats object of the file', async () => {
        const stats = { a: 3 }
        statMock.mockReturnValue(stats)

        const filePath = 'C:\\temp\file'

        const fileStats = await readFileStats.read(filePath)

        expect(statMock).toHaveBeenCalledWith(filePath)
        expect(fileStats).toBe(stats)

    })

})
