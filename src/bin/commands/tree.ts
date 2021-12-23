import { Options } from "yargs";
import colors from "colors";
import { iterateFiles, humanSize, IterateFileOptions } from "../../index";

export const command = "tree [dir]";
export const desc = "递归列出dir目录下文件";

type OptionType = {
  dir: string,
  deep?: number,
  dirInclude?: string
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
    type: "number"
  },
  dirInclude: {
    describe: "仅包含的目录",
    type: "string"
  },
  dirExclude: {
    describe: "需要排除的目录",
    type: "string"
  }
};
export const handler = function ({ dir, deep, dirInclude, dirExclude }: OptionType) {
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
  for (let item of iterateFiles(dir, opts)) {
    const isFile = item.state.isFile();

    const partTime = item.state.ctime.toLocaleString();
    const partSize = isFile ? humanSize(item.state.size).str : "-";
    const partPath = item.relativePath;
    const col = isFile ? colors.green : colors.yellow;

    const line = `${partTime.padStart(25, " ")} ${partSize.padStart(9, " ")} ${partPath}`;
    console.log(col(line));
  }
}