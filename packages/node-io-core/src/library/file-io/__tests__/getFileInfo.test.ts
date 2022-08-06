import path from "path";
import fs from "fs";
import { getFileInfo } from "../getFileInfo";

describe("getFileInfo.test", () => {
  const root = path.join(process.cwd(), "temp");
  const childDir = path.join(root, "getFileInfo-dir");
  beforeEach(() => {
    if (!fs.existsSync(childDir)) {
      fs.mkdirSync(childDir, { recursive: true });
    }
  });
  afterEach(() => {
    if (fs.existsSync(childDir)) {
      fs.rmdirSync(childDir, { recursive: true });
    }
  });
  test("正确解析文件信息", () => {
    const filePath = path.join(root, "README.md");
    const info = getFileInfo(root, filePath, fs.statSync(filePath));
    expect(info.deep).toBe(1);
    expect(info.name).toBe("README.md");
    expect(info.ext).toBe(".md");
    expect(info.relativePath).toBe("README.md");
  });
  test("正确解析子目录文件信息", () => {
    const filePath = path.join(childDir, "file.txt");
    fs.writeFileSync(filePath, "hello", { encoding: "utf-8" });
    const info = getFileInfo(root, filePath, fs.statSync(filePath));
    expect(info.deep).toBe(2);
    expect(info.name).toBe("file.txt");
    expect(info.ext).toBe(".txt");
    expect(info.relativePath).toBe(`getFileInfo-dir${path.sep}file.txt`);
  });
  test("正确解析子目录信息", () => {
    const info = getFileInfo(root, childDir, fs.statSync(childDir));
    expect(info.deep).toBe(1);
    expect(info.name).toBe("getFileInfo-dir");
    expect(info.ext).toBe(undefined);
    expect(info.relativePath).toBe(`getFileInfo-dir`);
  });
});