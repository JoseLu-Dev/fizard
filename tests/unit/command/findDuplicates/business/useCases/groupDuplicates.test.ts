import { GroupDuplicateFiles } from '../../../../../../src/command/findDuplicates/business/useCases/groupDuplicates';
import { FileWrapper } from '../../../../../../src/common/business/fileWrapper';


const groupDuplicateFiles = new GroupDuplicateFiles()

describe('group', () => {

    it('groups files based on hash property', async () => {

        const files: FileWrapper[] = [
            {
                hash: 'ab'
            },
            {
                hash: 'ab'
            },
            {
                hash: 'a'
            }
        ] as FileWrapper[]


        const grouped: Record<string, FileWrapper[]> = groupDuplicateFiles.group(files)

        expect(grouped['ab']).toHaveLength(2)
        expect(grouped['a']).toHaveLength(1)

    })

    it('does not add file to dict if file does not have hash', async () => {

        const files: FileWrapper[] = [{}] as FileWrapper[]


        const grouped: Record<string, FileWrapper[]> = groupDuplicateFiles.group(files)

        expect(grouped).toStrictEqual({})
        
    })

})