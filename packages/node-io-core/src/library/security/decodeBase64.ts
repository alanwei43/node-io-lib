
export function decodeBase64(base64: string): Buffer;
export function decodeBase64(base64: string, encode?: BufferEncoding): string;

/**
 * 解码base64
 * @date 2022-01-17
 */
export function decodeBase64(base64: string, encode?: BufferEncoding): Buffer | string {
  const buffer = Buffer.from(base64, "base64");
  return encode ? buffer.toString("utf-8") : buffer;
}