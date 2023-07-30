import { promisify } from "util";
import { exec } from "child_process";
import fs from "fs";
const executeCommand = promisify(exec);
import toml from "toml";

// helper file to read yaml file and parse it as json
const readFileToJson = async (filePath) => {
  let { stdout, stderr } = await executeCommand(`rain fmt ${filePath} -j`);
  if (stderr) console.log(stderr);
  else return JSON.parse(stdout);
};

// helper file to read yaml file and parse it as json
const readFileToYaml = async (filePath) => {
  let { stdout, stderr } = await executeCommand(`rain fmt ${filePath}`);
  if (stderr) console.log(stderr);
  else return JSON.parse(stdout);
};

const readJson = async (filePath) => {
  let json = await fs.promises.readFile(filePath, "utf8");
  return JSON.parse(json);
};

const readConfig = async () => {
  const shelbysamConfig = toml.parse(
    fs.readFileSync("shelbysam-config.toml", "utf8")
  );
  return shelbysamConfig;
};

export { readFileToJson, readFileToYaml, readJson, readConfig };
