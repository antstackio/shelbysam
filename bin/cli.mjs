#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { init } from "./commands/init.mjs";
import { build } from "./commands/build.mjs";

// Get the original command from process.argv
const command = process.argv.slice(2).join(" ");

yargs(hideBin(process.argv))
  .command(
    "init",
    "Initialize SAM Application",
    (yargs) => {
      yargs.option("name", {
        description: "SAM Application Name",
        type: "string",
        required: true,
      });
      yargs.option("path", {
        description: "Path of destructured resources",
        type: "string",
        required: true,
      });
    },
    (argv) => {
      init(argv, command);
    }
  )
  .command(
    "build",
    "Building SAM Application",
    (yargs) => {},
    (argv) => {
      build(argv, command);
    }
  )
  .option("help", {
    alias: "h",
    type: "boolean",
    description: "coming soon*",
  })
  .version()
  .parse();
