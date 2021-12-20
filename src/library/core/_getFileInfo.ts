import path from "path";
import type { FileDirInfo } from "./index";

/**
 * 生成文件信息
 */
export function _getFileInfo(rootDir: string, fullPath: string, state: FileDirInfo["state"]): FileDirInfo {
  return {
    state: state,
    name: path.basename(fullPath),
    ext: state.isFile() ? path.extname(fullPath) : undefined,
    fullPath: fullPath,
    relativePath: path.relative(rootDir, fullPath)
  };
}