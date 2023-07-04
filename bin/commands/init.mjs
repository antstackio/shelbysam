#!/usr/bin/env node

// Import required packages
import yaml from "js-yaml";
import fs from "fs/promises";
import { spawn } from "child_process";
import { readFileToJson } from "../utils/helper.mjs";

// deconstructing constants
const keySeparatorsL1 = ["Globals", "Outputs", "Parameters"];
const keySeparatorsL2 = ["Resources"];

// deconstructing loop
const deconstructingLoop = async (template, args, keysL1, keysL2) => {
  //create dir
  await fs.mkdir(args.name + "/" + args.path, { recursive: true });
  // loop through the template
  for (const [k, v] of Object.entries(template)) {
    // create files for the selected keys - l1
    if (keysL1.includes(k)) {
      const newFileTemplate = JSON.parse(JSON.stringify(v, null, 4));
      await fs.writeFile(
        args.name + "/" + args.path + "/" + k + ".yml",
        yaml.dump(newFileTemplate)
      );
      template[k] = "${file:" + args.path + "/" + k + ".yml" + "}";
    }
    // create files for the selected keys - l2
    else if (keysL2.includes(k)) {
      template[k] = await deconstructingLoop(
        template[k],
        { name: args.name, path: args.path + "/" + k },
        Object.keys(template[k]),
        []
      );
    }
  }
  return template;
};

// Main function
const init = async (args, command) => {
  const samInit = spawn("sam", ["init", "--name", args.name], {
    stdio: "inherit",
  });

  samInit.on("close", async (code) => {
    // error handler for sam init
    if (code !== 0) {
      console.error(`"sam init" process exited with code ${code}`);
    }
    // rename template file
    fs.rename(args.name + "/template.yaml", args.name + "/shelbysam.yaml");

    // declare template
    let template = await readFileToJson(args.name + "/shelbysam.yaml");

    // create deconstructed files
    template = await deconstructingLoop(
      template,
      args,
      keySeparatorsL1,
      keySeparatorsL2
    );

    // save deconstructed template
    await fs.writeFile(args.name + "/shelbysam.yaml", yaml.dump(template));
  });
};

export { init };
