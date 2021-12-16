import { getPkgInfo } from "../getPkgInfo";

describe("getPkgInfo.test", () => {
  test("right project name", () => {
    const pkg = getPkgInfo();
    expect(pkg.name).toBe("node-io-lib")
  });
});