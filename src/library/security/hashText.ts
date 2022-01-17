import crypto from "crypto";
import { HashCalculateOptions } from "./hashStream";

/**
 * 计算hash
 * @param text 明文
 * @param opts 默认使用 sha256 算法
 * @date 2022-01-16
 */
export function hashText(text: string, opts: HashCalculateOptions = {}): string {
  return crypto.createHash(opts.algorithm || "sha256").update(text).digest(opts.digest || "hex");
}
