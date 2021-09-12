const preset = require('ts-jest/jest-preset');

module.exports = {
  ...preset,
  globals: {},
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['vue', 'ts']
};
