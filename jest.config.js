module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}",  // Collect coverage for all JavaScript/TypeScript files in the src folder
      "!src/**/*.test.{js,jsx,ts,tsx}",  // Exclude test files from coverage
      "!src/**/node_modules/**",  // Exclude node_modules from coverage
      "!src/**/*.d.ts"  // Exclude type declaration files
    ],
    coverageDirectory: "./coverage",  // Optional: specify the directory where the coverage report should be saved
    coverageReporters: ["text", "lcov", "html"],  // Optional: specify the format of the coverage reports
  };