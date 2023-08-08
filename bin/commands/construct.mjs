#!/usr/bin/env node
import fs from "fs";
import yaml from "js-yaml";
import { readYaml, readConfig } from "../utils/helper.mjs";
import { constructingLoop } from "../utils/constructor.mjs";

// Main Function
const construct = async (args, command) => {
  const shelbysamConfigExists = fs.existsSync("shelbysam-config.toml");
  let shelbysamConfig = {
    shelbysam_template_file: "shelbysam.yaml",
    sam_template_file: "template.yaml",
  };
  if (shelbysamConfigExists) shelbysamConfig = await readConfig();

  args.itemplate = args.itemplate
    ? args.itemplate
    : shelbysamConfig.shelbysam_template_file;
  args.otemplate = args.otemplate
    ? args.otemplate
    : shelbysamConfig.sam_template_file;

  // read base file
  let baseTemplate = await readYaml(args.itemplate);

  // construct template file
  baseTemplate = await constructingLoop(baseTemplate);

  // write the output
  fs.writeFileSync(args.otemplate, yaml.dump(baseTemplate));
};

export { construct };
