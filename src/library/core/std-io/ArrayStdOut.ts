import { Color } from "colors";
import { IStdOut } from "./IStdOut";

export type ArrayStdItem = { text: string, color?: Color, newline: boolean }

export class ArrayStdOut implements IStdOut {
  private readonly stack: Array<ArrayStdItem> = [];

  write(text: string, color?: Color): void {
    this.stack.push({
      text: text,
      color: color,
      newline: false
    });
  }
  writeln(text: string, color?: Color): void {
    this.stack.push({
      text: text,
      color: color,
      newline: false
    });
  }

  getPrints(): Array<ArrayStdItem> {
    return this.stack;
  }
  public static of(): ArrayStdOut {
    return new ArrayStdOut();
  }
}