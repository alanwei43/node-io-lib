import crypto, { BinaryToTextEncoding } from "crypto";
import { EventEmitter } from "events";
import { Emitter } from "./Emitter";

export type HashStreamReader = {
  data: Buffer
  close: void
  error: Error
}
export type HashStreamResultEvents = {
  progress: { size: number }
  success: string | Buffer
  error: Error
}
export type HashStreamResult = {
  events: Emitter<HashStreamResultEvents>
  promise: Promise<string | Buffer>
}

/**
 * 计算流hash
 * @author 创建人 
 * @date 2022-01-16
 */
export function hashStream(reader: Emitter<HashStreamReader>, opts: HashCalculateOptions = {}): HashStreamResult {
  const hub: Emitter<HashStreamResultEvents> = new EventEmitter();
  const promise: Promise<string | Buffer> = new Promise((resolve, reject) => {
    const md5 = crypto.createHash(opts.algorithm || "md5");
    let progressSize = 0;
    reader.on("data", function (chunk: Buffer) {
      md5.update(chunk);
      progressSize += chunk.length;
      hub.emit("progress", {
        size: progressSize
      });
    });
    reader.on("error", err => {
      hub.emit("error", err);
      reject(err);
    });
    reader.on("close", function () {
      const r = md5.digest(opts.digest);
      hub.emit("success", r);
      resolve(r);
    });
  })
  return { events: hub, promise: promise };
}


/**
 * hash选项
 */
export type HashCalculateOptions = {
  /**
   * hash 算法以来本地 OpenSSL 的版本支持的算法（常用的有: "md5" | "sha256" | "sha512" ）
   */
  algorithm?: string
  /**
   * digest 算法
   */
  digest?: BinaryToTextEncoding
}