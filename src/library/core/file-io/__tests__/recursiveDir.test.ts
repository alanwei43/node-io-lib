import path from "path";
import { recursiveDir } from "../recursiveDir";

describe("recursiveDir.test", () => {
  beforeEach(() => {
  });
  afterEach(() => {
  });
  test("递归当前目录_正确返回", () => {
    const root = process.cwd();
    const files = recursiveDir(root, {
      "recursive": true,
      "dirFilter": dir => dir.includes("src")
    }).map(item => ({
      ...item,
      relative: path.relative(root, item.fullPath)
    }));
    expect(files.length).toBeGreaterThan(0);
    const match = files.find(item => item.fullPath === __filename);
    expect(match.fullPath).toEqual(__filename);
  });
});