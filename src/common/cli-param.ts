/**
 * Interface that represents an parameter of a command or a command option
 */
export interface CliParam{

    /**
     * Name of the parameter
     */
    name: string

    /**
     * If the parameter is required
     */
    required?: boolean

    /**
     * If the parameter is optional
     */
    optional?: boolean
}