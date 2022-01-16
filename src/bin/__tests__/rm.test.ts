
import fs from "fs";
import path from "path";
import { handler } from "../commands/rm";

describe("rm.test", () => {
  test("测试文件夹删除", () => {
    const root = path.join("temp", "hello-" + Date.now());
    fs.mkdirSync(root);
    const file = path.join(root, "file.txt");
    fs.writeFileSync(file, "hello", { encoding: "utf-8" });
    expect(fs.existsSync(root)).toBe(true);
    expect(fs.existsSync(file)).toBe(true);

    handler({ dir: root, yes: true });
    expect(fs.existsSync(root)).toBe(false);
    expect(fs.existsSync(file)).toBe(false);
  });
});