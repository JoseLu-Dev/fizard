import { SpecificOptions } from '../../../common/business/command/commandOptions';
export interface GroupOptions extends SpecificOptions{
    dateCreated?: string | boolean
    extension?: true | undefined
}