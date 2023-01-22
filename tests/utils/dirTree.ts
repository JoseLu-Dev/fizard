export interface DirTree{
    path: string
    name: string
    type: string
    children: DirTree[]
}