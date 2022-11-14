import { Stats } from "fs"

export class FileWrapper {
    pathCurrent: string
    pathNew?: string
    stats?: Stats

    constructor(properties: { pathCurrent: string }) {
        this.pathCurrent = properties.pathCurrent
    }
}