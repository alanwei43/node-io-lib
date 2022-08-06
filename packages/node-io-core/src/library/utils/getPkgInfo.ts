import fs from "fs";
import path from "path";

export type GetPkgInfoResult = {
  name: string
  version: string
  description: string
}

export type GetPkgInfoDef = {
  (): GetPkgInfoResult
  __cache?: GetPkgInfoResult
}

/**
 * 获取项目信息
 */
export const getPkgInfo: GetPkgInfoDef = function (): GetPkgInfoResult {
  if (getPkgInfo.__cache) {
    return getPkgInfo.__cache;
  }
  const pkgPath = path.join(__dirname, "..", "..", "..", "package.json");
  const pkgJson = fs.readFileSync(pkgPath, { encoding: "utf-8" });
  getPkgInfo.__cache = JSON.parse(pkgJson);
  return getPkgInfo.__cache;
}