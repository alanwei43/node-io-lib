import { hashText } from "../hashText";

describe("hashText.test", () => {
  test("默认使用 sha256 算法", () => {
    expect(hashText("hello")).toBe("2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824");
  });

  test("指定hash算法", () => {
    expect(hashText("hello", {
      algorithm: "md5",
    })).toBe("5d41402abc4b2a76b9719d911017c592");
  });
  test("指定digest算法", () => {
    expect(hashText("hello world!", {
      algorithm: "md5",
      "digest":"base64"
    })).toBe("/D/5joxqDTCH1RXARz+Gdw==");
  });
});