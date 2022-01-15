import fs from "fs";
import path from "path";
import colors from "colors";
import { question } from "../../index";
import { Options } from "yargs";

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
  const target = path.resolve(dir);
  if (!fs.existsSync(target)) {
    console.log(colors.red(`文件/目录 ${target} 不存在`));
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
    console.log(colors.green(`${target} 删除成功`));
    return;
  }
  if (stat.isFile()) {
    fs.unlinkSync(target);
    console.log(colors.green(`${target} 删除成功`));
    return;
  }
  console.log(colors.green(`${target} 不是文件/目录, 删除失败.`));

}