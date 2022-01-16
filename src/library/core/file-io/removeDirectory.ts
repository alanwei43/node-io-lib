import fs from "fs";

export type RemoveDirectoryOptions = {
  /**
    * When `true`, exceptions will be ignored if `path` does not exist.
    * @default false
    */
  force?: boolean
  /**
   * If an `EBUSY`, `EMFILE`, `ENFILE`, `ENOTEMPTY`, or
   * `EPERM` error is encountered, Node.js will retry the operation with a linear
   * backoff wait of `retryDelay` ms longer on each try. This option represents the
   * number of retries. This option is ignored if the `recursive` option is not
   * `true`.
   * @default 0
   */
  maxRetries?: number
  /**
   * If `true`, perform a recursive directory removal. In
   * recursive mode, operations are retried on failure.
   * @default false
   */
  recursive?: boolean
  /**
   * The amount of time in milliseconds to wait between retries.
   * This option is ignored if the `recursive` option is not `true`.
   * @default 100
   */
  retryDelay?: number
}

/**
 * 删除目录(兼容新老版本Node)
 * @date 2022-01-16
 */
export function removeDirectory(dir: string, options: RemoveDirectoryOptions): boolean {
  if (typeof fs.rmSync === "function") {
    fs.rmSync(dir, {
      recursive: !!options.recursive,
      "force": !!options.force,
      "maxRetries": options.maxRetries || 0,
      "retryDelay": options.retryDelay || 100
    });
    return;
  }
  if (typeof fs.rmdirSync === "function") {
    fs.rmdirSync(dir, {
      recursive: !!options.recursive,
      "maxRetries": options.maxRetries || 0,
      "retryDelay": options.retryDelay || 100,
    });
    return;
  }
  throw new Error("fs.rmSync/fs.rmdirSync not support");
}