/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],  // ✅ connect DB before tests
  testTimeout: 20000,
};

