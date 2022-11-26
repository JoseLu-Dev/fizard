import { Stats } from "fs"

export class FileWrapper {
    pathCurrent: string
    pathNew: string
    name: string

    isNew?: boolean

    stats?: Stats

    constructor(params: { pathCurrent: string, name: string }) {
        this.pathCurrent = params.pathCurrent
        this.pathNew = params.pathCurrent
        this.name = params.name
    }

    pathCurrentComplete(): string {
        return `${this.pathCurrent}\\${this.name}`
    }

    pathNewComplete(): string {
        return `${this.pathNew}\\${this.name}`
    }

}