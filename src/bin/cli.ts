#!/usr/bin/env node

import yargs from "yargs";

const ext = __filename.split(".")[__filename.split(".").length - 1] || "js";

yargs.commandDir("commands", {
  recurse: true,
  extensions: [ext]
}).demandCommand()
  .version()
  .help()
  .argv;