module.exports = {
  roots: ["."],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testEnvironment: "node",
  testPathIgnorePatterns: ["/coverage", "/dist"],
  collectCoverageFrom: ["src/**/*.ts"],
};
