import { SpecificOptions } from '../../../common/business/command/commandOptions';

export interface FindDuplicatesOptions extends SpecificOptions{
    deleteDuplicates?: true | undefined
}