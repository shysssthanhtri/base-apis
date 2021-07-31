import { getDynamicConfig, setDynamicConfig } from "config/dynamic-config";


describe("dynamic-config", () => {

  describe("getDynamicConfig", () => {

    const key = "TEST_KEY";
    const value = "TEST_VALUE";

    beforeEach(() => {
      process.env[key] = value;
    });

    it("should get correct config", () => {
      const value = getDynamicConfig(key);
      expect(value).toEqual(value);
    });
    it("should throw error", () => {
      expect(() => getDynamicConfig("abc-def-xyz")).toThrowError();
    });
  });

  describe("setDynamicConfig", () => {

    const key = "TEST_KEY";
    const value = "TEST_VALUE";

    it("should get correct config", () => {
      setDynamicConfig(key, value);
      expect(process.env[key]).toEqual(value);
    });
  });
});
