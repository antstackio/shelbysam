#!/usr/bin/env node
import { spawn } from "child_process";
import { deconstruct } from "./deconstruct.mjs";

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
    await deconstruct(args, command);
  });
};

export { init };
