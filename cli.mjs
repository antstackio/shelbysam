#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { init } from "./node-scripts/init.mjs";
import { build } from "./node-scripts/build.mjs";

// Get the original command from process.argv
const command = process.argv.slice(2).join(" ");

yargs(hideBin(process.argv))
  .command(
    "init",
    "Initialize SAM",
    (yargs) => {
      // yargs.option("name", {
      //   description: "Name of the SAM Application",
      //   type: "string",
      //   demandOption: true,
      // });
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
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "coming soon*",
  })
  .option("help", {
    alias: "h",
    type: "boolean",
    description: "coming soon*",
  })
  .parse();
