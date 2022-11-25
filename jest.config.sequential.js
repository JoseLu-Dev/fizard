/* eslint-disable max-len */
/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
    // A set of global variables that need to be available in all test environments
    globals: {
        'ts-jest': {
            isolatedModules: true,
            tsconfig: 'tsconfig.testing.json'
        }
    },

    // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
    maxWorkers: 1,

    // The test environment that will be used for testing
    testEnvironment: 'node',

    // A map from regular expressions to paths to transformers
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },

    // Indicates whether each individual test should be reported during the run
    verbose: true,

    // If 'true' console.log will not be shown
    silent: true,
}