import { promisify } from "util";
import { exec } from "child_process";
const executeCommand = promisify(exec);

// helper file to read file and parse it as json
const readFileToJson = async (filePath) => {
  let { stdout, stderr } = await executeCommand(`rain fmt ${filePath} -j`);
  if (stderr) console.log(stderr);
  else return JSON.parse(stdout);
};

const readFileToYaml = async (filePath) => {
  let { stdout, stderr } = await executeCommand(`rain fmt ${filePath}`);
  if (stderr) console.log(stderr);
  else return JSON.parse(stdout);
};

export { readFileToJson, readFileToYaml };
