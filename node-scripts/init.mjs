import { spawn } from "child_process";
import fs from "fs/promises";

const init = (args, command) => {
  console.log(args);
  const samInit = spawn("sam", ["init", "--name", args.name], {
    stdio: "inherit",
  });

  // Listen for the 'data' event on the stdin of the spawned process
  samInit.on("data", (data) => {
    console.log("Received message from child process:", data);
  });

  samInit.on("close", (code) => {
    if (code !== 0) {
      console.error(`"sam init" process exited with code ${code}`);
    }
    fs.rename(args.name + "/template.yaml", args.name + "/shelbysam.yaml");
  });
};

export { init };
