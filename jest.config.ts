import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  detectOpenHandles: true,
  verbose: true,
};

export default config;
