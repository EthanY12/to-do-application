module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
  testPathIgnorePatterns: ["/node_modules/", "/cypress/"],
  testMatch: ["<rootDir>/src/tests/unit/**/*.test.[jt]s?(x)"],
};
