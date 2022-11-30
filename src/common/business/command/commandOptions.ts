export interface CommandOptions{
    path: string

    findOptions?: FindOptions

    specificOptions?: SpecificOptions
}

export interface FindOptions{
    regex?: string
    recursive?: boolean
}

export interface SpecificOptions{}