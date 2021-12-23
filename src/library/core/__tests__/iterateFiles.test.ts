import path from "path";
import fs from "fs";
import { iterateFiles } from "../iterateFiles";

describe("iterateFiles.test", () => {
  test("deep测试 > 限制指定层级目录", () => {
    const dir = path.join(process.cwd(), "src");

    // 限制1级目录
    const list1 = Array.from(iterateFiles(dir, { deep: 1 })).map(i => i.relativePath);
    const list2 = fs.readdirSync(dir);
    expect(list1.length).toBe(list2.length);
    list1.forEach((p, i) => {
      expect(list1[i]).toBe(list2[i]);
    })

    // 限制2级目录
    Array.from(iterateFiles(dir, { deep: 2 }))
      .forEach(({ relativePath, deep: itemDeep }) => {
        const deep = relativePath.split(path.sep).length;
        expect(deep).toBeLessThan(3);
        expect(deep).toBeGreaterThan(0);
        expect(deep).toBe(itemDeep);
      });
  });

  test("filter测试 > 排除指定目录", () => {
    const dir = process.cwd();
    const list = Array.from(iterateFiles(dir, {
      filter: item => item.name !== "node_modules" && item.name !== ".git"
    }));
    expect(list.filter(item => item.name === "package.json").length).toBe(1);
    expect(list.filter(item => item.name === "tsconfig.json").length).toBe(1);
    expect(list.filter(item => item.name === ".git").length).toBe(0);
    expect(list.filter(item => item.name === "node_modules").length).toBe(0);
    expect(list.filter(item => item.ext === ".ts").length).toBeGreaterThan(0);
    expect(list.filter(item => item.relativePath.includes("__tests__")).length).toBeGreaterThan(0);
  });

  test("无效入参校验", () => {
    let dir: any = {};
    expect(Array.from(iterateFiles(dir)).length).toBe(0);
    dir = "";
    expect(Array.from(iterateFiles(dir)).length).toBe(0);
    dir = Math.random() + "";
    expect(Array.from(iterateFiles(dir)).length).toBe(0);
  });

  test("传入文件地址", () => {
    const fp = path.join(process.cwd(), "package.json");
    const list = Array.from(iterateFiles(fp));
    expect(list.length).toBe(1);
    expect(list[0].ext).toBe(".json");
    expect(list[0].name).toBe("package.json");
    expect(list[0].relativePath).toBe("package.json");
  });

});