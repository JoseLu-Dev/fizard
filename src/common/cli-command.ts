import { CliOption } from "./cli-option";
import { CliParametrized } from "./cli-parametrized";

/**
 * Interface that represents a command
 */
export interface CliCommand extends CliParametrized {

    /**
     * Name to execute this command
     */
    name: string

    /**
     * Brief description of what the command does
     */
    description: string

    /**
     * Optional behavior
     */
    options?: Array<CliOption>

    /**
     * Code that the command executes
     * Options contains a id-value of options that the user introduces
     * Ex: { include-ts: true, path: "src/commands" }
     */
    action: (name: any, options: any, command: any) => void
}