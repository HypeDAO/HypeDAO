/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // All imported modules in your tests should be mocked automatically
  automock: false,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // A set of global variables that need to be available in all test environments
  "globals": {
    "ts-jest": {
      "tsconfig": "tsconfig.jest.json"
    }
  },

  // An array of file extensions your modules use
  moduleFileExtensions: [
    "js",
    "jsx",
    "ts",
    "tsx",
    // "json",
    // "node"
  ],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  "moduleNameMapper": {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(png|webp)$": "<rootDir>/__mocks__/imageMock.js"
  },

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)"
    // "**/?(*.)+(spec|test).[tj]s?(x)"
  ],

  testPathIgnorePatterns: [
    "/node_modules/",
  ],

  // A map from regular expressions to paths to transformers
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};
