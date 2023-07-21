#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { init } from "./commands/init.mjs";
import { build } from "./commands/build.mjs";
import { deconstruct } from "./commands/deconstruct.mjs";
import { construct } from "./commands/construct.mjs";
import { add } from "./commands/add.mjs";

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
  .command(
    "construct",
    "Construct SAM Application's template.yaml",
    (yargs) => {},
    (argv) => {
      construct(argv, command);
    }
  )
  .command(
    "deconstruct",
    "Deconstruct existing template file",
    (yargs) => {
      yargs.option("template", {
        description: "Name of the template file to be deconstructed",
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
      deconstruct(argv, command);
    }
  )
  .command(
    "add",
    "Add a new resource to the ShelbySAM template",
    (yargs) => {
      yargs.option("resource", {
        description: "Cloudformation resource type",
        type: "string",
        required: true,
      });
      yargs.option("name", {
        description: "Cloudformation logical id",
        type: "string",
        required: true,
      });
    },
    (argv) => {
      add(argv, command);
    }
  )
  .option("help", {
    alias: "h",
    type: "boolean",
    description: "coming soon*",
  })
  .version("1.0.7")
  .parse();
