import path from "path";
import type { Stats } from "fs";

export interface FileInformation {
  /**
   * 文件/目录状态
   */
  state: Stats
  /**
   * 文件名/目录名
   */
  name: string
  /**
   * 文件扩展参数
   */
  ext: string
  /**
   * 文件/目录绝对(完整)路径
   */
  fullPath: string
  /**
   * 文件/目录相对路径
   */
  relativePath: string
  /**
   * 文件/目录 深度
   */
  deep: number
}
/**
 * 生成文件信息
 */
export function getFileInfo(rootDir: string, fullPath: string, state: FileInformation["state"]): FileInformation {
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