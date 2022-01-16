import fs from "fs";
import path from "path";
import colors from "colors";
import { Options } from "yargs";
import { question, ProcessStdOut } from "../../index";

export const command = "rm [dir]";
export const desc = "删除文件或目录";

type OptionType = {
  dir: string,
  yes?: boolean
}
export const builder: { [key in keyof OptionType]: Options } = {
  dir: {
    describe: "待删除的目录或文件",
    type: "string",
    requiresArg: true
  },
  yes: {
    describe: "确认删除",
    alias: "y",
    requiresArg: false,
    type: "boolean"
  }
};
export const handler = async function ({ dir, yes }: OptionType) {
  const p = new ProcessStdOut();
  const target = path.resolve(dir);
  if (!fs.existsSync(target)) {
    p.writeln(`文件/目录 ${target} 不存在`, colors.red);
    return;
  }

  if (!yes) {
    const answer = await question(colors.red(`确认删除 ${target}?(y/N)`));
    if (answer.toLowerCase() !== "y") {
      return;
    }
  }
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    // 执行目录删除
    fs.rmSync(target, {
      retryDelay: 300,
      recursive: true,
      maxRetries: 10,
    });
    p.writeln(`${target} 删除成功`, colors.green);
    return;
  }
  if (stat.isFile()) {
    fs.unlinkSync(target);
    p.writeln(`${target} 删除成功`, colors.green);
    return;
  }
  p.writeln(`${target} 不是文件/目录, 删除失败.`, colors.green);
}