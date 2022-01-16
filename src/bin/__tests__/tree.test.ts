import fs from "fs";
import path from "path";
import { handler } from "../commands/tree";
import { ArrayStdOut, removeDirectory } from "../../index";

describe("tree.test", () => {
  let root = path.join("temp", "tree-" + Date.now());
  beforeAll(() => {
    fs.mkdirSync(root);
    fs.writeFileSync(path.join(root, "hello.txt"), "hello world.", { encoding: "utf-8" });

    fs.mkdirSync(path.join(root, "child1"));
    fs.writeFileSync(path.join(root, "child1", "config.json"), "{}", { encoding: "utf-8" });

    fs.mkdirSync(path.join(root, "child2"));
    fs.writeFileSync(path.join(root, "child2", "think.ts"), "export function hello(){}", { encoding: "utf-8" });

    fs.mkdirSync(path.join(root, "child2", "child2-nest"));
    fs.writeFileSync(path.join(root, "child2", "child2-nest", "style.css"), "body {color: green}", { encoding: "utf-8" });
  });
  afterAll(() => {
    removeDirectory(root, { recursive: true });
  });
  test("正确列出所有文件", () => {
    const std: ArrayStdOut = ArrayStdOut.of();
    handler({
      dir: path.resolve(root)
    }, std);
    const lines = std.getPrints();
    expect(lines.length).toEqual(7);
    expect(lines[0].text).toContain("- child1");
    expect(lines[1].text).toContain("2B child1/config.json");
    expect(lines[2].text).toContain("- child2");
    expect(lines[3].text).toContain("- child2/child2-nest");
    expect(lines[4].text).toContain("19B child2/child2-nest/style.css");
    expect(lines[5].text).toContain("25B child2/think.ts");
    expect(lines[6].text).toContain("12B hello.txt");
  });
  test("限制层级", () => {
    const std: ArrayStdOut = ArrayStdOut.of();
    handler({
      dir: path.resolve(root),
      deep: 1
    }, std);
    const lines = std.getPrints();
    expect(lines.length).toEqual(3);
    expect(lines[0].text).toContain("- child1");
    expect(lines[1].text).toContain("- child2");
    expect(lines[2].text).toContain("12B hello.txt");
  });
  test("排除特定文件夹", () => {
    const std: ArrayStdOut = ArrayStdOut.of();
    handler({
      dir: path.resolve(root),
      "dirExclude": "child2"
    }, std);
    const lines = std.getPrints();
    expect(lines.length).toEqual(3);
    expect(lines[0].text).toContain("- child1");
    expect(lines[1].text).toContain("2B child1/config.json");
    expect(lines[2].text).toContain("12B hello.txt");
  });
  test("包含特定文件夹", () => {
    const std: ArrayStdOut = ArrayStdOut.of();
    handler({
      dir: path.resolve(root),
      "dirInclude": "child2"
    }, std);
    const lines = std.getPrints();
    expect(lines.length).toEqual(5);
    expect(lines[0].text).toContain("- child2");
    expect(lines[1].text).toContain("- child2/child2-nest");
    expect(lines[2].text).toContain("19B child2/child2-nest/style.css");
    expect(lines[3].text).toContain("25B child2/think.ts");
    expect(lines[4].text).toContain("12B hello.txt");
  });
});