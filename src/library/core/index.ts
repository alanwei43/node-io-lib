import type { Stats } from "fs";
export * from "./iterateFiles";
export * from "./recursiveDir";

export interface FileInfo {
  state: Stats
  fullPath: string
  relativePath: string
}