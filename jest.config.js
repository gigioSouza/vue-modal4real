const preset = require('ts-jest/jest-preset');

module.exports = {
  ...preset,
  globals: {},
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['vue', 'ts', 'js'],
  testMatch: [
    '**/tests/unit/**/*.test.(ts|tsx)'
  ],
  collectCoverage: false,
  collectCoverageFrom: [
    'lib/**/*.(ts|vue|js)',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  coverageDirectory: './coverage'
};
