import fs from "fs";

/**
 * 删除目录及其子目录(兼容新老版本Node)
 * @date 2022-01-16
 */
export function removeDirectory(dir: string): boolean {
  if (typeof fs.rmSync === "function") {
    fs.rmSync(dir, {
      recursive: true,
      "force": true
    });
    return;
  }
  if (typeof fs.rmdirSync === "function") {
    fs.rmdirSync(dir, {
      recursive: true,
      "maxRetries": 0,
      "retryDelay": 100
    });
    return;
  }
  throw new Error("fs.rmSync/fs.rmdirSync not support");
}