module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts', 'json'],
  testMatch: ['**/*.test.ts'],
  preset: 'ts-jest',
  verbose: true,
  setupFilesAfterEnv: ['./jest.setup.js']
}
