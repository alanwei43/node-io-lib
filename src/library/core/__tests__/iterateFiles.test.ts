import path from "path";
import fs from "fs";
import { iterateFiles } from "../iterateFiles";

describe("iterateFiles.test", () => {
  test("迭代目录", () => {
    const dir = path.join(process.cwd(), "src");
    const iterator = iterateFiles(dir);
    const list: Array<string> = [];
    while (true) {
      const item = iterator.next();
      if (item.done) {
        break;
      }
      if (item.value.fullPath.includes("__tests__")) {
        const val = iterator.next("break");
        continue;
      }
      list.push(item.value.relativePath);
    }
    expect(list.filter(i => i.includes("__tests__")).length).toBe(0);
    expect(list.length).toBeGreaterThan(0);
  });
});