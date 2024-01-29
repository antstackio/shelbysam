#!/usr/bin/env node
import {
  readYaml,
  readConfig,
  writeYaml,
  matchRegex,
} from "../utils/helper.mjs";
import fs from "fs";

// Main Function
const remove = async (args, command) => {
  // read config file
  const shelbysamConfig = await readConfig();

  // read template
  const shelbysamTemplate = await readYaml(
    shelbysamConfig.shelbysam_template_file
  );

  const resource = matchRegex(shelbysamTemplate.Resources[args.lid]);

  // Direct File References
  if (resource[0] === "File") {
    fs.rmSync(resource[1][1]);
  }
  // File Object / Group References
  else if (resource[0] === "FileObject") {
    const resourceTemplate = await readYaml(resource[1][1]);
    delete resourceTemplate[resource[1][2]];
    await writeYaml(resource[1][1], resourceTemplate);
  }

  // update shelbysam template
  delete shelbysamTemplate.Resources[args.lid];
  await writeYaml(shelbysamConfig.shelbysam_template_file, shelbysamTemplate);
  return;
};

export { remove };
