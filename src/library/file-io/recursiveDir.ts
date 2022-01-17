import path from "path";
import fs from "fs";
import { getFileInfo, FileInformation } from "./getFileInfo";

/**
 * 递归目录及子目录下的文件
 * @param rootDir - 需要递归的目录
 * @param options - 选项
 * @deprecated
 */
export function recursiveDir(rootDir: string, options?: RecursiveOptions): Array<FileInformation> {
  const files: Array<FileInformation> = [];

  if (!fs.existsSync(rootDir)) {
    return files;
  }
  const dirStat = fs.statSync(rootDir);
  files.push(getFileInfo(rootDir, rootDir, dirStat));
  doList(files, rootDir, rootDir, options);
  return files;
}
function doList(list: Array<FileInformation>, dir: string, rootDir: string, options: RecursiveOptions) {
  const files = fs.readdirSync(dir)
    .map(f => path.join(dir, f))
    .map(f => getFileInfo(rootDir, f, fs.statSync(f)))
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