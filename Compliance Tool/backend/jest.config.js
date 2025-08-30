module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  testMatch: [
    '<rootDir>/tests/**/*.(test|spec).[jt]s',
    '<rootDir>/tests/**/*.(test|spec).[jt]sx',
    '<rootDir>/src/**/*.(test|spec).[jt]s',
    '<rootDir>/src/**/*.(test|spec).[jt]sx'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  }
}; 