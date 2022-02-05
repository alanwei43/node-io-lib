import path from "path";
import fs from "fs";
import { removeDirectory } from "../removeDirectory";

describe("removeDirectory.test", () => {
  const root = path.join(process.cwd(), "temp");
  const childDir = path.join(root, "removeDirectory-dir");

  test("正常删除目录", () => {
    fs.mkdirSync(childDir, { recursive: true });
    expect(fs.existsSync(childDir)).toBe(true);
    fs.writeFileSync(path.join(childDir, "hello.txt"), "hello.txt", { encoding: "utf-8" });

    removeDirectory(childDir);
    expect(fs.existsSync(childDir)).toBe(false);
  });
});