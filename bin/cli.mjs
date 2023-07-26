#!/usr/bin/env node
import yargs from "yargs/yargs";
import inquirer from "inquirer";
import autocompletePrompt from "inquirer-autocomplete-prompt";

import { hideBin } from "yargs/helpers";
import { init } from "./commands/init.mjs";
import { build } from "./commands/build.mjs";
import { deconstruct } from "./commands/deconstruct.mjs";
import { construct } from "./commands/construct.mjs";
import { add } from "./commands/add.mjs";
import { config } from "./commands/config.mjs";

// Get the original command from process.argv
const command = process.argv.slice(2).join(" ");
const awsRegions = [
  "us-east-1",
  "us-east-2",
  "us-west-1",
  "us-west-2",
  "ap-south-1",
  "ap-south-2",
  "af-south-1",
  "ap-east-1",
  "ap-northeast-1",
  "ap-northeast-2",
  "ap-northeast-3",
  "ap-southeast-1",
  "ap-southeast-2",
  "ap-southeast-3",
  "ap-southeast-4",
  "ca-central-1",
  "cn-north-1",
  "cn-northwest-1",
  "eu-central-1",
  "eu-central-2",
  "eu-north-1",
  "eu-south-1",
  "eu-south-2",
  "eu-west-1",
  "eu-west-1",
  "eu-west-2",
  "eu-west-3",
  "me-central-1",
  "me-south-1",
  "sa-east-1",
  "us-gov-east-1",
  "us-gov-west-1",
];

inquirer.registerPrompt("autocomplete", autocompletePrompt);

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
  .command("config", "Configure ShelbySAM", {}, () => {
    inquirer
      .prompt([
        {
          type: "autocomplete",
          name: "region",
          message: "Select your AWS region:",
          source: (answers, input) => {
            return Promise.resolve(
              awsRegions.filter((region) => region.includes(input || ""))
            );
          },
        },

        {
          type: "input",
          name: "sam_template_file",
          default: "template.yaml",
          message: "Enter the SAM template file name: ",
        },
        {
          type: "input",
          name: "shelbysam_template_file",
          default: "shelbysam.yaml",
          message: "Enter the ShelbySAM template file name: ",
        },
        {
          type: "input",
          name: "shelbysam_template_folder",
          default: "infra_resources",
          message: "Enter the ShelbySAM template folder name: ",
        },
      ])
      .then((answers) => {
        config(answers);
      });
  })
  .option("help", {
    alias: "h",
    type: "boolean",
    description: "coming soon*",
  })
  .version("1.0.7")
  .parse();
