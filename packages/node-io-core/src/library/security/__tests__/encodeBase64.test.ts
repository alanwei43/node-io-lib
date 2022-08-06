import { encodeBase64 } from "../encodeBase64";

describe("encodeBase64.test", () => {
  test("编码字符串", () => {
    expect(encodeBase64("hello")).toEqual("aGVsbG8=");
  });
});