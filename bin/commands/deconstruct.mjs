#!/usr/bin/env node

import yaml from "js-yaml";
import fs from "fs";
import { readYaml, readConfig } from "../utils/helper.mjs";
import { deconstructingLoop } from "../utils/deconstructor.mjs";

const keySeparatorsL1 = ["Globals", "Outputs", "Parameters"];
const keySeparatorsL2 = ["Resources"];

// Main function
const deconstruct = async (args, command) => {
  const shelbysamConfigExists = fs.existsSync("shelbysam-config.toml");

  let shelbysamConfig = {
    sam_template_file: "template.yaml",
    shelbysam_template_folder: "infra_resources",
  };
  if (shelbysamConfigExists) shelbysamConfig = await readConfig();

  // Switching between args.template and args.name is to enable reusability between init and deconstruct commands
  args.template = args.template
    ? args.template
    : shelbysamConfig.sam_template_file;
  args.path = args.path ? args.path : shelbysamConfig.shelbysam_template_folder;

  // copy template file
  fs.cpSync(args.template, "shelbysam.yaml");

  // declare template
  let template = await readYaml("shelbysam.yaml");

  // create deconstructed files
  template = await deconstructingLoop(
    template,
    args,
    keySeparatorsL1,
    keySeparatorsL2
  );

  // save deconstructed template
  await fs.writeFileSync("shelbysam.yaml", yaml.dump(template));
};

export { deconstruct };
