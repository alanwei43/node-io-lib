import { Options } from 'yargs';
import { ProcessStdOut } from '../../library/std-io';
import { getMyIp } from "../../library/utils/index";
import colors from "colors";

export const command = 'ip [timeout]';
export const desc = '编码/解码 Base64';

type OptionType = {
  timeout?: number,
}
export const builder: { [key in keyof OptionType]: Options } = {
  timeout: {
    requiresArg: false
  }
};
export const handler = async function ({ timeout }: OptionType) {
  const p = new ProcessStdOut();
  const list = await getMyIp(timeout);
  for (let item of list) {
    p.writeln(`source: ${item.source}, cost: ${item.cost}ms`);
    p.write("IP: ");
    p.write(item.ip, colors.green);
    p.writeln("\n");
  }
}