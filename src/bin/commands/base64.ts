import fs from "fs";
import path from "path";
import { Options } from 'yargs';
import { red } from "colors";
import { ProcessStdOut, encodeBase64, decodeBase64 } from "../../index";

export const command = 'base64 [input]';
export const desc = '编码/解码 Base64';

type OptionType = {
  input: string,
  encode?: boolean
  decode?: boolean
  file?: boolean
}
export const builder: { [key in keyof OptionType]: Options } = {
  input: {
    requiresArg: true,
    description: '输入文本/文件路径',
    type: 'string'
  },
  encode: {
    requiresArg: false,
    description: '执行编码',
    default: false,
    type: 'boolean',
    alias: 'e'
  },
  decode: {
    requiresArg: false,
    description: '执行解码',
    default: false,
    type: 'boolean',
    alias: 'd'
  },
  file: {
    requiresArg: false,
    description: 'input是文件路径',
    default: false,
    type: 'boolean',
    alias: 'f'
  }
};
export const handler = function ({ input, encode, decode, file }: OptionType) {
  const print = new ProcessStdOut();
  if (!input) {
    print.writeln("input参数不能为空", red);
    return;
  }

  if (file) {
    if (!fs.existsSync(input)) {
      print.writeln(`文件 ${input} 不存在`);
    }
    print.writeln(`读取文件 ${input} 内容`);
    input = fs.readFileSync(input, { encoding: "utf-8" });
    print.writeln(`读取到内容长度 ${input.length}`);
  }

  if (encode) {
    print.writeln(encodeBase64(input));
    return;
  }
  if (decode) {
    print.writeln(decodeBase64(input, "utf-8"))
    return;
  }

  print.writeln(encodeBase64(input));
}