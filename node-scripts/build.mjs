import { spawn, exec } from "child_process";
import { promisify } from "util";
const executeCommand = promisify(exec);
import fs from "fs";

// constants
const fileRegex = /\$\{file:(.*?)\}/g;
const fileObjectRegex = /\$\{file:([^:}]+):([^}]+)\}/g;
const basePath = "sam_cloudformation/";

// helper file to read file and parse it as json
const readFileToJson = async (filePath) => {
  let { stdout, stderr } = await executeCommand(`rain fmt ${filePath} -j`);
  if (stderr) console.log(stderr);
  else return JSON.parse(stdout);
};

// recursive loop
const jsonLoop = async (data) => {
  for (const [k, v] of Object.entries(data)) {
    if (typeof v === "object") {
      data[k] = await jsonLoop(v);
    } else if (typeof v === "string") {
      console.log(v);
      let matchedRegex1 = [...v.matchAll(fileObjectRegex)];
      if (matchedRegex1 !== null && matchedRegex1.length > 0) {
        let temp = await readFileToJson(matchedRegex1[0][1]);
        data[k] = temp[matchedRegex1[0][2]];
      } else {
        let matchedRegex2 = [...v.matchAll(fileRegex)];
        if (matchedRegex2 !== null && matchedRegex2.length > 0) {
          data[k] = await readFileToJson(matchedRegex2[0][1]);
        }
      }
    }
  }
  return data;
};

// Main Function
const build = async (args, command) => {
  console.log(command, args);

  // init base file
  let baseTemplate = await readFileToJson("shelbysam.yml");

  // start the loop
  baseTemplate = await jsonLoop(baseTemplate);

  //write the output
  await fs.promises.mkdir(".shelbysam", { recursive: true });
  await fs.promises.writeFile(
    ".shelbysam/shelbysam.json",
    JSON.stringify(baseTemplate, null, 2)
  );
};

export { build };
