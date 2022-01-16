import type { Stats } from "fs";

export interface FileDirInfo {
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