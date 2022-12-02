import { Stats } from "fs"
import * as path from 'path'

export class FileWrapper {
    pathCurrent: string
    pathNew: string
    name: string

    isNew?: boolean

    stats?: Stats

    constructor(params: { pathCurrent: string, name: string, isNew?: boolean, stats?: Stats }) {
        this.pathCurrent = params.pathCurrent
        this.pathNew = params.pathCurrent
        this.name = params.name
        this.isNew = params.isNew
        this.stats = params.stats
    }

    pathCurrentComplete(): string {
        return path.join(this.pathCurrent, this.name)
    }

    pathNewComplete(): string {
        return path.join(this.pathNew, this.name)
    }

}