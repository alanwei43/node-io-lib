import colors from "colors";
export interface IStdOut {
  write(text: string, color?: colors.Color): void
  writeln(text: string, color?: colors.Color): void
}