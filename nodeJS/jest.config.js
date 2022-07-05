module.exports = {
  verbose: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.spec.js'],
  reporters: [
    'default',
    'jest-summary-reporter'
  ]
};
