#!/usr/bin/env node
import { readFileToJson, readConfig } from "../utils/helper.mjs";
import fs from "fs";
import yaml from "js-yaml";

// Main Function
const remove = async (args, command) => {
  // read config file
  const shelbysamConfig = await readConfig();

  // read template
  const shelbysamTemplate = await readFileToJson(
    shelbysamConfig.shelbysam_template_file
  );

  // set resource path
  const shelbysamResourcePath =
    shelbysamConfig.shelbysam_template_folder +
    "/Resources/" +
    args.lid +
    ".yaml";

  // remove the resource from template
  delete shelbysamTemplate.Resources[args.lid];

  // remove the resource file
  fs.rmSync(shelbysamResourcePath);

  // write the final template
  fs.writeFileSync(
    `${shelbysamConfig.shelbysam_template_file}`,
    yaml.dump(shelbysamTemplate)
  );

  return {};
};

export { remove };
