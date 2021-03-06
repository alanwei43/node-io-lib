import fs from "fs";
import path from "path";
import { getFileInfo, FileInformation } from "./getFileInfo";

export type IterateFileOptions = {
  /**
   * 迭代的目录深度
   */
  deep?: number
  /**
   * 文件/目录过滤器
   */
  filter?: IterateFileFilter
}
export type IterateFileResult = Generator<FileInformation, IterateFileReturn, IterateFileNext>;
export type IterateFileReturn = void
export type IterateFileNext = void
export type IterateFileFilter = {
  (f: FileInformation): boolean
}

/**
 * 迭代目录及子目录下的文件
 * @param rootDir - 需要迭代的根目录
 * @param options - 选项
 */
export function* iterateFiles(rootDir: string, options: IterateFileOptions = {}): IterateFileResult {
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
    yield getFileInfo(path.dirname(rootDir), rootDir, rootState);
    return;
  }

  const maxDeep = typeof options.deep === "number" && options.deep > 0 ? options.deep : -1;
  const filter: IterateFileFilter = typeof options.filter === "function" ? options.filter : _ => true;

  yield* (function* iterate(dir: string): IterateFileResult {
    for (let item of fs.readdirSync(dir, { encoding: "utf-8" })) {
      const fullPath = path.join(dir, item);
      const result: FileInformation = getFileInfo(rootDir, fullPath, fs.statSync(fullPath));
      if (filter(result)) {
        yield result;
      }
      if (result.state.isDirectory() && filter(result)) {
        const curDeep = result.deep;
        if (maxDeep > 0 && maxDeep <= curDeep) {
          continue;
        }
        yield* iterate(fullPath);
      }
    }
  })(rootDir);
}