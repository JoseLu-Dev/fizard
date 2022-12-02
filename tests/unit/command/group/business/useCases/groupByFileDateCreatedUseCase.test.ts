import { Stats } from "fs"
import * as path from 'path'

import { GroupByFileDateCreatedUseCase } from "../../../../../../src/command/group/business/useCases/groupByFileDateCreatedUseCase"
import { FileWrapper } from "../../../../../../src/common/business/fileWrapper"

const groupByFileExtension = new GroupByFileDateCreatedUseCase()

describe('group', () => {

    it('moves files to a year-month-day folder', async () => {

        const files: FileWrapper[] = [
            new FileWrapper({
                pathCurrent: 'downloads', name: 'example.mp4',
                stats: { mtime: new Date(2022, 10, 3) } as Stats
            })
        ]

        groupByFileExtension.group(files)

        expect(files[0].pathNewComplete()).toBe(path.join('downloads','2022-11-3','example.mp4'))
    })

    it('moves files to a no-date when FileWrapper has no stats', async () => {

        const files: FileWrapper[] = [
            new FileWrapper({ pathCurrent: 'downloads', name: 'example.mp4' })
        ]

        groupByFileExtension.group(files)

        expect(files[0].pathNewComplete()).toBe(path.join('downloads','no-date','example.mp4'))
    })

})