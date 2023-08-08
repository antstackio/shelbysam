#!/usr/bin/env node
import yargs from "yargs/yargs";
import inquirer from "inquirer";
import autocompletePrompt from "inquirer-autocomplete-prompt";

import { hideBin } from "yargs/helpers";
import { deconstruct } from "./commands/deconstruct.mjs";
import { construct } from "./commands/construct.mjs";
import { add } from "./commands/add.mjs";
import { config } from "./commands/config.mjs";
import { remove } from "./commands/remove.mjs";
import { clone } from "./commands/clone.mjs";
import { awsRegions } from "./utils/constants.mjs";

// Get the original command from process.argv
const command = process.argv.slice(2).join(" ");

inquirer.registerPrompt("autocomplete", autocompletePrompt);

yargs(hideBin(process.argv))
  .command(
    "construct",
    "Construct SAM Application's template.yaml",
    (yargs) => {
      yargs.option("itemplate", {
        description: "Name of the template file to be constructed",
        type: "string",
        alias: "i",
      });
      yargs.option("otemplate", {
        description: "Name of the constructed template file",
        type: "string",
        alias: "o",
      });
    },
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
        alias: "t",
      });
      yargs.option("path", {
        description: "Path of destructured resources",
        type: "string",
        alias: "p",
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
      yargs.option("type", {
        description: "Cloudformation resource type",
        type: "string",
        alias: "t",
        required: true,
      });
      yargs.option("lid", {
        description: "Cloudformation logical id",
        type: "string",
        alias: "i",
        required: true,
      });
    },
    (argv) => {
      add(argv, command);
    }
  )
  .command(
    "remove",
    "Remove an existing resource from the ShelbySAM template",
    (yargs) => {
      yargs.option("lid", {
        description: "Cloudformation logical id",
        type: "string",
        alias: "i",
        required: true,
      });
    },
    (argv) => {
      remove(argv, command);
    }
  )
  .command(
    "clone",
    "Clone an existing resource from the ShelbySAM template",
    (yargs) => {
      yargs.option("slid", {
        description: "Source Cloudformation logical id",
        alias: "s",
        type: "string",
        required: true,
      });
      yargs.option("dlid", {
        description: "Destination Cloudformation Logical Id",
        alias: "d",
        type: "string",
        required: true,
      });
      yargs.option("group", {
        description: "Group Resource Option",
        alias: "g",
        type: "boolean",
        default: false,
      });
    },
    (argv) => {
      clone(argv, command);
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
  .version("1.0.7")
  .parse();
