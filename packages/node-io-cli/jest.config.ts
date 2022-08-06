import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    clearMocks: true,
    testMatch: [
      "<rootDir>/src/**/__tests__/**/*.test.ts",
      "<rootDir>/src/**/__tests__/**/*.spec.ts",
    ],
    testPathIgnorePatterns: ["/node_modules/"],
  };
}