import { Options } from "yargs";
import colors from "colors";
import { IStdOut, ProcessStdOut } from "../../index";
import { iterateFiles, humanSize, IterateFileOptions, } from "node-io-core";

export const command = "tree [dir]";
export const desc = "递归列出dir目录下文件";

type OptionType = {
  dir: string,
  /**
   * 目录最大层级
   */
  deep?: number,
  /**
   * 需要包含的目录(正则表达式)
   */
  dirInclude?: string
  /**
   * 需要排除的目录(正则表达式)
   */
  dirExclude?: string

}
export const builder: { [key in keyof OptionType]: Options } = {
  dir: {
    default: ".",
    describe: "目录(默认当前目录)",
    type: "string"
  },
  deep: {
    describe: "目录深度",
    type: "number",
    alias: "d"
  },
  dirInclude: {
    describe: "仅包含的目录",
    type: "string",
    alias: "i"
  },
  dirExclude: {
    describe: "需要排除的目录",
    type: "string",
    alias: "e"
  }
};
export const handler = function ({ dir, deep, dirInclude, dirExclude }: OptionType, print?: IStdOut) {
  let totalSize = 0;
  let totalFileCount = 0;
  let totalDirCount = 0;

  const p = print || new ProcessStdOut();
  const opts: IterateFileOptions = {
    deep: deep,
    filter: item => {
      if (item.state.isDirectory()) {
        if (dirExclude) {
          return !new RegExp(dirExclude, "ig").test(item.relativePath);
        }
        if (dirInclude) {
          return new RegExp(dirInclude, "ig").test(item.relativePath);
        }
      }
      return true;
    }
  };
  for (const item of iterateFiles(dir, opts)) {
    const isFile = item.state.isFile();

    const partTime = item.state.ctime.toLocaleString();
    const partSize = isFile ? humanSize(item.state.size).str : "-";
    const partPath = item.relativePath;
    const col: colors.Color = isFile ? colors.green : colors.yellow;
    const line = `${partTime.padStart(25, " ")} ${partSize.padStart(9, " ")} ${partPath}`;
    p.writeln(line, col);
    if (isFile) {
      totalSize += item.state.size;
      totalFileCount++;
    } else {
      totalDirCount++;
    }
  }
  p.writeln(`${totalDirCount}个目录, ${totalFileCount}个文件, 全部文件大小:${humanSize(totalSize).str}`);
}