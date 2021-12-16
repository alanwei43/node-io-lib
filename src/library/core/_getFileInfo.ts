import path from "path";
import type { FileInfo } from "./index";

/**
 * 生成文件信息
 */
export function _getFileInfo(rootDir: string, fullPath: string, state: FileInfo["state"]): FileInfo {

  return {
    state: state,
    "fullPath": fullPath,
    relativePath: path.relative(rootDir, fullPath)
  }
}