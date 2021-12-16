import path from "path";
import fs from "fs";
import type { FileInfo } from "./index"
import { _getFileInfo } from "./_getFileInfo";
// 4371+7756

export interface RecursiveOptions {
  /**
   * 是否递归子目录
   */
  recursive?: boolean,
  /**
   * 是否深度优先
   */
  deepFirst?: boolean,
  /**
   * 目录过滤
   */
  dirFilter?: (dir: string) => boolean,
  /**
   * 文件过滤
   */
  fileFilter?: (file: string) => boolean
}

export function recursiveDir(rootDir: string, options?: RecursiveOptions): Array<FileInfo> {
  const files: Array<FileInfo> = [];

  if (!fs.existsSync(rootDir)) {
    return files;
  }
  const dirStat = fs.statSync(rootDir);
  files.push(_getFileInfo(rootDir, rootDir, dirStat));
  doList(files, rootDir, rootDir, options);
  return files;
}
function doList(list: Array<FileInfo>, dir: string, rootDir: string, options: RecursiveOptions) {
  const files = fs.readdirSync(dir)
    .map(f => path.join(dir, f))
    .map(f => _getFileInfo(rootDir, f, fs.statSync(f)))
    .filter(f => {
      if (f.state.isDirectory() && typeof options.dirFilter === "function") {
        return options.dirFilter(f.fullPath);
      }
      if (f.state.isFile() && typeof options.fileFilter === "function") {
        return options.fileFilter(f.fullPath);
      }
      return true;
    });

  if (options.deepFirst) {
    if (options.recursive) {
      files.filter(f => f.state.isDirectory()).forEach(childDir => {
        doList(list, childDir.fullPath, rootDir, options);
      });
    }

    list.splice(list.length, 0, ...files);
  } else {
    list.splice(list.length, 0, ...files);

    if (options.recursive) {
      files.filter(f => f.state.isDirectory())
        .forEach(childDir => {
          doList(list, childDir.fullPath, rootDir, options);
        });
    }
  }
}