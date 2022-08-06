import colors from "colors";
import { IStdOut } from "./IStdOut";

/**
 * 输出到控制台
 * @date 2022-01-16
 */
export class ProcessStdOut implements IStdOut {
  write(text: string, color?: colors.Color): void {
    if (color) {
      process.stdout.write(color(text));
      return;
    }
    process.stdout.write(text);
  }

  writeln(text: string, color?: colors.Color): void {
    this.write(text, color);
    this.write("\n");
  }
}