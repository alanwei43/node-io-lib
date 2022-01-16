import { Options } from "yargs";
import colors from "colors";
import { ProcessStdOut, hashText, hashFile } from "../../index";

export const command = "hash";
export const desc = "计算hash";

type OptionType = {
  text?: string
  file?: string
  directory?: string
}
export const builder: { [key in keyof OptionType]: Options } = {
  text: {
    describe: "文本内容",
    type: "string",
    alias: "t"
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
  }
};
export const handler = async function ({ text, file, directory }: OptionType) {
  let hashValue: string | Buffer = "";
  const print = new ProcessStdOut();
  if (text) {
    hashValue = hashText(text, { algorithm: "md5" });
  }
  if (file) {
    hashValue = await hashFile(file, {
      hash: {
        algorithm: "md5",
        digest: "hex"
      }
    }).promise;
  }
  print.writeln(hashValue + "", colors.green);
  print.writeln("");
}