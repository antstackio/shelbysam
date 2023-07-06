#!/usr/bin/env node
import { spawn } from "child_process";
import { construct } from "./construct.mjs";

// Main Function
const build = async (args, command) => {
  // construct shelbysam.yaml and generate template.yaml
  await construct();

  // initiate sam build
  const samBuild = spawn("sam", ["build"], {
    stdio: "inherit",
  });

  samBuild.on("close", async (code) => {
    // error handler for sam init
    if (code !== 0) {
      console.error(`"sam init" process exited with code ${code}`);
    }
  });
};

export { build };
