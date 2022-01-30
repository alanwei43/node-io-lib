import fs from "fs";
import path from "path";
import { Options } from 'yargs';
import colors from "colors";
import { ProcessStdOut } from "../../index";

export const command = 'version [value]';
export const desc = '更新 package.json 版本号';

type OptionType = {
  value: string,
}
export const builder: { [key in keyof OptionType]: Options } = {
  value: {
    requiresArg: false,
    description: '版本号',
    type: 'string'
  }
};
export const handler = function ({ value }: OptionType) {
  const print = new ProcessStdOut();
  const pkgFile = path.resolve("package.json"), lockPkgFile = path.resolve("package-lock.json");

  if (!fs.existsSync(pkgFile)) {
    print.writeln(`文件 ${pkgFile} 不存在`, colors.red);
    return;
  }
  const pkgObj: { version: string } = JSON.parse(fs.readFileSync(pkgFile, { encoding: "utf-8" }));
  const currentVersion = pkgObj.version.split(".").map(v => parseInt(v, 10));
  let newVersion = "";

  if (value === "patch") {
    currentVersion[2] += 1;
    newVersion = currentVersion.join(".");
  }
  if (value === "minor") {
    currentVersion[1] += 1;
    newVersion = currentVersion.join(".");
  }
  if (value === "major") {
    currentVersion[0] += 1;
    newVersion = currentVersion.join(".");
  }
  const match = /(\d+)\.(\d+)\.(\d+)/.exec(value);
  if (match && match.length === 4) {
    newVersion = value;
  }

  if (!newVersion) {
    print.writeln(`输入不合法: ${value}`);
    return;
  }

  print.writeln(`[package.json] 老版本号: ${pkgObj.version}, 新版本号: ${newVersion}`, colors.green);
  pkgObj.version = newVersion;
  fs.writeFileSync(pkgFile, JSON.stringify(pkgObj, null, "  "), { encoding: "utf-8" });

  if (fs.existsSync(lockPkgFile)) {
    const lockPkgObj = JSON.parse(fs.readFileSync(lockPkgFile, { encoding: "utf-8" }));
    print.writeln(`[package-lock.json] 老版本号: ${lockPkgObj.version}, 新版本号: ${newVersion}`, colors.green);
    lockPkgObj.version = newVersion;
    fs.writeFileSync(lockPkgFile, JSON.stringify(lockPkgObj, null, "  "), { encoding: "utf-8" });
  }
}