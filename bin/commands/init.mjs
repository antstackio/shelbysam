#!/usr/bin/env node
import { spawn } from "child_process";
import { deconstruct } from "./deconstruct.mjs";
import { readConfig } from "../utils/helper.mjs";

// Main function
const init = async (args, command) => {
  const shelbysamConfig = await readConfig();
  args.name = shelbysamConfig.sam_app_name;
  args.path = shelbysamConfig.shelbysam_template_folder;

  const samInit = spawn("sam", ["init", "--name", args.name], {
    stdio: "inherit",
  });

  // future case
  // change template.yaml to the name specified in shelbysam config

  samInit.on("close", async (code) => {
    // error handler for sam init
    if (code !== 0) {
      console.error(`"sam init" process exited with code ${code}`);
    }
    await deconstruct(args, command);
  });
};

export { init };
