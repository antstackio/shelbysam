#!/usr/bin/env node
import { readJson, readFileToJson, readConfig } from "../utils/helper.mjs";
import fs from "fs";
import yaml from "js-yaml";
let templateRegistry = {};

// Main Function
const clone = async (args, command) => {
  // read config file
  const shelbysamConfig = await readConfig();

  // read template file
  const shelbysamTemplate = await readFileToJson(
    shelbysamConfig.shelbysam_template_file
  );

  // set source resource path
  const shelbysamSourceResourcePath =
    shelbysamConfig.shelbysam_template_folder +
    "/Resources/" +
    args.slid +
    ".yaml";

  // set destination resource path
  const shelbysamDestinationResourcePath =
    shelbysamConfig.shelbysam_template_folder +
    "/Resources/" +
    args.dlid +
    ".yaml";

  // add resource to template
  shelbysamTemplate.Resources[args.dlid] =
    "${file:" + shelbysamDestinationResourcePath + "}";

  // write the resource file
  fs.cpSync(shelbysamSourceResourcePath, shelbysamDestinationResourcePath);

  // write the final template
  fs.writeFileSync(
    `${shelbysamConfig.shelbysam_template_file}`,
    yaml.dump(shelbysamTemplate)
  );

  return {};
};

// add support for nested file objects

export { clone };
