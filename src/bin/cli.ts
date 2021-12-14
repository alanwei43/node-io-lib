#!/usr/bin/env node

import yargs from "yargs";
import { getPkgInfo } from "../index";

yargs.commandDir("commands", {
  recurse: true,
  extensions: ["js", "ts"]
}).demandCommand()
  .version("version", "显示版本号", getPkgInfo().version)
  .help("help", "显示帮助")
  .argv;