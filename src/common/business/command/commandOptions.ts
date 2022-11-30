import { FindOptions } from "./findOptions"

export interface CommandOptions{
    path: string

    findOptions?: FindOptions

    specificOptions?: SpecificOptions
}

export interface SpecificOptions{}