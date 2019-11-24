module.exports = {
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  testMatch: [
    '<rootDir>/src/**/*.spec.(js|ts)',
    '<rootDir>/test/**/*.spec.(js|ts)'
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/'
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'ts'
  ],
  transform: {
    '.*\\.(ts)$': '<rootDir>/node_modules/ts-jest'
  },
  modulePaths: [
    '<rootDir>/libs/'
  ],
  moduleNameMapper: {
    '^#test/(.*)$': '<rootDir>/test/$1',
    '@/(.*)$': '<rootDir>/src/app/$1',
  },
}
