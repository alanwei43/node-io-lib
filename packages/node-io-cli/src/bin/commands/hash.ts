import { Options } from "yargs";
import colors from "colors";
import { ProcessStdOut } from "../../index";
import { hashText, hashFile, iterateFiles } from "node-io-core";

export const command = "hash [text]";
export const desc = "计算hash";

type OptionType = {
  text?: string
  file?: string
  directory?: string
  algorithm?: string
}
export const builder: { [key in keyof OptionType]: Options } = {
  text: {
    describe: "文本内容",
    type: "string"
  },
  file: {
    describe: "计算文件内容的hash",
    type: "string",
    alias: "f"
  },
  directory: {
    describe: "计算目录下所有文件的hash",
    type: "string",
    alias: "d"
  },
  algorithm: {
    description: "hash算法",
    type: "string",
    alias: "a",
    choices: ["md5", "sha256", "sha512"],
    requiresArg: false,
    default: "md5"
  }
};
export const handler = async function ({ text, file, directory, algorithm }: OptionType) {
  const print = new ProcessStdOut();
  if (text) {
    const hashValue = hashText(text, { algorithm: algorithm || "md5" });
    print.writeln(`[文本] ${text} \n${hashValue}`, colors.green);
    return;
  }
  if (file) {
    const hashValue = await hashFile(file, {
      hash: {
        algorithm: "md5",
        digest: "hex"
      }
    }).promise;
    print.writeln(`[文件] ${file} \n${hashValue}`, colors.green);
    return;
  }
  if (directory) {
    for (const fi of iterateFiles(directory)) {
      if (!fi.state.isFile()) {
        continue;
      }
      const hashValue = await hashFile(fi.fullPath, {
        hash: {
          algorithm: "md5",
          digest: "hex"
        }
      }).promise;
      print.writeln(`${hashValue} ${fi.relativePath}`, colors.green);
    }
  }
}