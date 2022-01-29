import { Options } from 'yargs';
import fs from "fs";
import colors from "colors";
import { iterateFiles, ProcessStdOut, humanSize } from '../../index';

export const command = 'concat [dir] [dest]';
export const desc = '合并指定目录下的所有文件';

type OptionType = {
  dir: string
  dest?: string
  flag?: boolean
}
export const builder: { [key in keyof OptionType]: Options } = {
  dir: {
    requiresArg: false,
    description: '目录',
    type: 'string'
  },
  dest: {
    requiresArg: false,
    description: "合并后的文件",
    type: "string"
  },
  flag: {
    requiresArg: false,
    description: '是否增加文件标识',
    default: false,
    type: 'boolean',
    alias: 'f'
  }
};
export const handler = function ({ dir, dest, flag }: OptionType) {
  const print = new ProcessStdOut();
  if (!dest) {
    dest = "concat.data";
  }
  let fileCount = 0;
  // 函数体
  for (const item of iterateFiles(dir)) {
    if (item.state.isFile()) {
      const size = humanSize(item.state.size).str;
      print.writeln(`${item.relativePath} > ${size}`, colors.cyan);
      if (flag) {
        const data: string = fs.readFileSync(item.fullPath, { encoding: "utf-8" });
        fs.appendFileSync(dest, `====== file: ${item.relativePath} createAt: ${item.state.ctime.toLocaleString()} size: ${size} ======\n${data}\n\n`, { encoding: "utf-8" });
      } else {
        const data: Buffer = fs.readFileSync(item.fullPath);
        fs.appendFileSync(dest, data);
      }
      fileCount++;
    }
  }
  print.writeln(`${fileCount} 个文件合并到 ${dest}`, colors.blue);
}