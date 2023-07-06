#!/usr/bin/env node
import fs from "fs";
import yaml from "js-yaml";
import { readFileToJson } from "../utils/helper.mjs";
import { constructingLoop } from "../utils/constructor.mjs";

// Main Function
const construct = async (args, command) => {
  // read base file
  let baseTemplate = await readFileToJson("shelbysam.yaml");

  // construct template file
  baseTemplate = await constructingLoop(baseTemplate);

  // write the output
  fs.writeFileSync("template.yaml", yaml.dump(baseTemplate));
};

export { construct };
