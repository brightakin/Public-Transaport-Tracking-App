const jestExpoPreset = require("jest-expo/jest-preset");

module.exports = {
  ...jestExpoPreset,
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    ...jestExpoPreset.transformIgnorePatterns,
    "some-other-lib",
  ],
};
