import { CalculateFilesHash } from '../../../../../../src/command/findDuplicates/business/useCases/calculateFilesHash';
import { FileWrapper } from '../../../../../../src/common/business/fileWrapper';


const calculateMock = jest.fn()
const calculateFilesChecksum = new CalculateFilesHash(
    { calculate: calculateMock },
)

describe('calculate', () => {

    it('calculate hash for each file', async () => {
        const files: FileWrapper[] = [
            {
                pathCurrentComplete: () => 'current1',
            }
        ] as FileWrapper[]

        calculateMock.mockReturnValue('hashExample')

        calculateFilesChecksum.calculate(files, ()=>{})

        expect(files[0].hash).toBe('hashExample')

        expect(calculateMock).toBeCalledTimes(1)
        expect(calculateMock).toHaveBeenCalledWith('current1')    
    })

})