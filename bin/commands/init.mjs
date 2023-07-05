#!/usr/bin/env node

// Import required packages
import yaml from "js-yaml";
import fs from "fs/promises";
import { spawn } from "child_process";
import { readFileToJson } from "../utils/helper.mjs";
import { deconstructingLoop } from "../utils/deconstructor.mjs";

const keySeparatorsL1 = ["Globals", "Outputs", "Parameters"];
const keySeparatorsL2 = ["Resources"];

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
