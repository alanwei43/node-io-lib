export type EncodeBase64Params = {}
export interface EncodeBase64Result { }

/**
 * 编码base64
 * 
 * @date 2022-01-17
 */
export function encodeBase64(text: string): string {
  return Buffer.from(text, "utf-8").toString("base64");
}