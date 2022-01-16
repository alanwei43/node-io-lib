import path from "path";
import type { FileDirInfo } from "./FileDirInfo";

/**
 * 生成文件信息
 */
export function getFileInfo(rootDir: string, fullPath: string, state: FileDirInfo["state"]): FileDirInfo {
  const r = {
    state: state,
    name: path.basename(fullPath),
    ext: state.isFile() ? path.extname(fullPath) : undefined,
    fullPath: fullPath,
    relativePath: path.relative(rootDir, fullPath)
  };
  const deep = r.relativePath.split(path.sep).filter(part => part.length > 0).length;
  return { ...r, deep: deep };
}