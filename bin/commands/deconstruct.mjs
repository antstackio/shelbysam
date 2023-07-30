#!/usr/bin/env node

import yaml from "js-yaml";
import fs from "fs/promises";
import { readFileToJson } from "../utils/helper.mjs";
import { deconstructingLoop } from "../utils/deconstructor.mjs";

const keySeparatorsL1 = ["Globals", "Outputs", "Parameters"];
const keySeparatorsL2 = ["Resources"];

// Main function
const deconstruct = async (args, command) => {
  // Switching between args.template and args.name is to enable reusability

  // rename template file
  fs.rename(
    args.template ? args.template : args.name + "/template.yaml",
    args.name ? args.name + "/shelbysam.yaml" : "shelbysam.yaml"
  );

  // declare template
  let template = await readFileToJson(
    args.name ? args.name + "/shelbysam.yaml" : "shelbysam.yaml"
  );

  // create deconstructed files
  template = await deconstructingLoop(
    template,
    args,
    keySeparatorsL1,
    keySeparatorsL2
  );

  // save deconstructed template
  await fs.writeFile(args.name + "/shelbysam.yaml", yaml.dump(template));
};

export { deconstruct };
