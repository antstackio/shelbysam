#!/usr/bin/env node
import {
  readYaml,
  readConfig,
  matchRegex,
  writeYaml,
} from "../utils/helper.mjs";
import fs from "fs";

// Main Function
const clone = async (args, command) => {
  // read config file
  const shelbysamConfig = await readConfig();

  // read template
  const shelbysamTemplate = await readYaml(
    shelbysamConfig.shelbysam_template_file
  );

  // match regex for the available declarations
  const resource = matchRegex(shelbysamTemplate.Resources[args.slid]);

  const shelbysamSourceResourcePath = resource[1][1];
  const shelbysamDestinationResourcePath =
    shelbysamConfig.shelbysam_template_folder +
    "/Resources/" +
    args.dlid +
    ".yaml";

  // Direct File References
  if (resource[0] === "File") {
    shelbysamTemplate.Resources[args.dlid] =
      "${file:" + shelbysamDestinationResourcePath + "}";
    fs.cpSync(shelbysamSourceResourcePath, shelbysamDestinationResourcePath);
  }
  // File Object / Group References
  else if (resource[0] === "FileObject") {
    const sourceResources = await readYaml(shelbysamSourceResourcePath);

    // if group flag is set to true, re-create all resources in the file
    if (args.group) {
      const destResources = {};
      for (const [k, v] of Object.entries(sourceResources)) {
        shelbysamTemplate.Resources[args.dlid + k] =
          "${file:" + shelbysamDestinationResourcePath + ":" + k + "}";
        destResources[k] = v;
      }
      await writeYaml(shelbysamDestinationResourcePath, destResources);
    }
    // if group flag is set to false, re-create only the specified resource
    else {
      shelbysamTemplate.Resources[args.dlid] =
        "${file:" + shelbysamDestinationResourcePath + "}";

      console.log(sourceResources[resource[1][2]]);
      await writeYaml(
        shelbysamDestinationResourcePath,
        sourceResources[resource[1][2]]
      );
    }
  }

  // write the final template
  await writeYaml(shelbysamConfig.shelbysam_template_file, shelbysamTemplate);

  return;
};

// add support for nested file objects

export { clone };
