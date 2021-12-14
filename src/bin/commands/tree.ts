import { recursiveDir, humanSize } from "../../index";
import { Options } from "yargs";

export const command = "tree [dir]";
export const desc = "递归列出dir目录下文件";
export const builder: { [key: string]: Options } = {
  dir: {
    default: "./",
    describe: "目录"
  },
  recursive: {
    type: "boolean",
    default: true,
    describe: "是否递归子目录",
    alias: "r"
  }
};
export const handler = function (argv: { dir: string, recursive?: boolean }) {

  recursiveDir(argv.dir, {
    recursive: argv.recursive
  }).filter(item => item.stat.isFile())
    .forEach(item => {
      console.log(`${item.path}`)
    });
  process.exit();

}