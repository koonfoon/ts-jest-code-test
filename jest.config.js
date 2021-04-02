export default {
    preset: 'ts-jest/presets/default-esm',
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
    moduleNameMapper: {
        '(.*).js': ['$1'],
    }
};
