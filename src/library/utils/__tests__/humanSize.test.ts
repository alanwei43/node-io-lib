/**
 * @jest-environment jsdom
 */
 import { humanSize } from "../humanSize";

describe("humanSize.test", () => {
    test("正确返回size信息", () => {
      expect(humanSize(50 * 1024).str).toBe("50KB");
    });
});