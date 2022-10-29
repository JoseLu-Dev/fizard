import { CliParametrized } from "./cli-parametrized"

/**
 * Interface that represents an option of a command
 */
export interface CliOption extends CliParametrized{

    /**
     * Name of the option
     * Example: --path
     */
    name: string

    /**
     * Abbreviated name of the option
     * Example: -p
     */
    nameAbbreviated: string

    /**
     * Brief description of what the option does
     */
    description: string

    action: () => void
}