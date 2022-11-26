import { RegexFilter } from "../../../../src/common/filters/regexFilter"
import { FileWrapper } from "../../../../src/common/fileWrapper"

const regexFilter = new RegexFilter()

describe('filterTextList', () => {

    it('filters a list using a regular expression', async () => {

        const textFiltered = regexFilter.textList(['RegExr', 'Expression', 'see'], '([A-Z])\\w+')

        expect(textFiltered).toHaveLength(2)
    })

    it('filters a list of FileWrapper using a regular expression', async () => {

        const files = [
            new FileWrapper({pathCurrent: 'folder/RegExr', name: 'Expression'}),
            new FileWrapper({pathCurrent: 'folder/RegExr', name: 'expression'}),
            new FileWrapper({pathCurrent: 'folder', name: 'Expression'}),
            new FileWrapper({pathCurrent: 'folder', name: 'expression'}),
        ]

        const textFiltered = regexFilter.filePathCurrent(files, '([A-Z])\\w+')

        expect(textFiltered).toHaveLength(3)
    })

})
