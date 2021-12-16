import fs from "fs";
import path from "path";
import type { FileInfo } from "./index";
import { _getFileInfo } from "./_getFileInfo";

export type IterateFileResult = Generator<FileInfo, FileInfo, IterateFileNext>;
export type IterateFileNext = "break" | "return"

/**
 * 迭代文件
 */
export function* iterateFiles(rootDir: string): IterateFileResult {
  if (typeof rootDir !== "string") {
    return;
  }
  if (rootDir.length <= 0) {
    return;
  }
  if (!fs.existsSync(rootDir)) {
    return;
  }
  rootDir = path.resolve(rootDir);
  const rootState = fs.statSync(rootDir);
  if (!rootState.isDirectory()) {
    return _getFileInfo(rootDir, rootDir, rootState);
  }

  yield* _doIterator(rootDir, rootDir);
}

function* _doIterator(rootDir: string, dir: string): IterateFileResult {
  for (let item of fs.readdirSync(dir, { encoding: "utf-8" })) {
    const fullPath = path.join(dir, item);
    const result: FileInfo = _getFileInfo(rootDir, fullPath, fs.statSync(fullPath));
    yield result;
    if (result.state.isDirectory()) {
      for (let child of _doIterator(rootDir, fullPath)) {
        const val = yield child;
        if (val === "break") {
          break;
        }
        if (val === "return") {
          return;
        }
      }
    }
  }
}