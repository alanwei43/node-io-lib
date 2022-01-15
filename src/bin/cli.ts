#!/usr/bin/env node

import yargs from "yargs";
import { getPkgInfo } from "../index";

const ext = __filename.split(".")[__filename.split(".").length - 1] || "js";

yargs.commandDir("commands", {
  recurse: true,
  extensions: [ext]
}).demandCommand()
  .version("version", "显示版本号", getPkgInfo().version)
  .help("help", "显示帮助")
  .argv;