export default {
    roots: ['<rootDir>/src', '<rootDir>'],
    testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
};
