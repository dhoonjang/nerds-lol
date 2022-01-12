module.exports = {
  preset: 'ts-jest',
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  coverageThreshold: {
    global: {
      statements: 70,
    },
  },
  testEnvironment: 'jsdom',
};
