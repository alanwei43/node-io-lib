import { iterateFiles, humanSize } from "../../index";
import { Options } from "yargs";

export const command = "tree [dir]";
export const desc = "递归列出dir目录下文件";
export const builder: { [key: string]: Options } = {
  dir: {
    default: "./",
    describe: "目录"
  }
};
export const handler = function (argv: { dir: string, recursive?: boolean }) {
  for (let item of iterateFiles(argv.dir)) {
    console.log(`[${item.state.isFile() ? "F" : "D"}] ${item.relativePath}`)
  }
}