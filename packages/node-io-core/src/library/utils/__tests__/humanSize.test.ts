import { humanSize } from "../humanSize";

describe("humanSize.test", () => {
  test("正确返回size信息", () => {
    expect(humanSize(298).str).toBe("298B");
    expect(humanSize(50 * 1024).str).toBe("50KB");
    expect(humanSize(50.33 * 1024 * 1024).str).toBe("50.33MB");
    expect(humanSize(13 * 1024 * 1024 * 1024).str).toBe("13GB");
    expect(humanSize(780 * 1024 * 1024 * 1024 * 1024).str).toBe("780TB");
  });
});