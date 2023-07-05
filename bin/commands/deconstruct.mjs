#!/usr/bin/env node

// Import required packages
import yaml from "js-yaml";
import fs from "fs/promises";
import { readFileToJson } from "../utils/helper.mjs";
import { deconstructingLoop } from "../utils/deconstructor.mjs";

const keySeparatorsL1 = ["Globals", "Outputs", "Parameters"];
const keySeparatorsL2 = ["Resources"];

// Main function
const deconstruct = async (args, command) => {
  // rename template file
  fs.rename(args.template, "shelbysam.yaml");

  // declare template
  let template = await readFileToJson("shelbysam.yaml");

  // create deconstructed files
  template = await deconstructingLoop(
    template,
    args,
    keySeparatorsL1,
    keySeparatorsL2
  );

  // save deconstructed template
  await fs.writeFile("shelbysam.yaml", yaml.dump(template));
};

export { deconstruct };
