import fs from "fs";
import { EventEmitter } from "events";
import { Emitter } from "./Emitter";
import { hashStream, HashCalculateOptions, HashStreamReader, HashStreamResultEvents, HashStreamResult } from "./hashStream";

export type HashFileOptions = {
  /**
   * 文件每次读取大小
   */
  chunkSize?: number,
  /**
   * 计算hash时选项
   */
  hash?: HashCalculateOptions
}

export function hashFile(filePath: string, opts: HashFileOptions = {}): HashStreamResult {
  const hub: Emitter<HashStreamResultEvents> = new EventEmitter();

  if (!fs.existsSync(filePath)) {
    const err = new Error(`文件 ${filePath} 不存在`)
    hub.emit("error", err);
    return { events: hub, promise: Promise.reject(err) };
  }

  if (!fs.statSync(filePath).isFile()) {
    const err = new Error(`${filePath} 不是文件类型`)
    hub.emit("error", err);
    return { events: hub, promise: Promise.reject(err) };
  }

  const read: Emitter<HashStreamReader> = fs.createReadStream(filePath, {
    highWaterMark: opts.chunkSize || 1024 * 1024
  });
  return hashStream(read, opts.hash);
}