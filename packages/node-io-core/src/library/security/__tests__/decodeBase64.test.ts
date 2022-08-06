import { decodeBase64 } from "../decodeBase64";

describe("decodeBase64.test", () => {
  test("正确解码base64", () => {
    expect(decodeBase64("aGVsbG8=").toString("utf-8")).toEqual("hello");
  });
});