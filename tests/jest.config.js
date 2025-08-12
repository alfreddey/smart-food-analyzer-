module.exports = {
  testEnvironment: "jsdom", // now works because it's installed
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/../frontend/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
};
