import { schema } from "yaml-cfn";
import yaml from "js-yaml";
import fs from "fs";
import toml from "toml";

// helper file to read yaml file and parse it as json
const readFileToJson = async (filePath) => {
  let yamlString = fs.readFileSync(filePath, "utf8");
  return yaml.load(yamlString, { schema: schema });
};

const readJson = async (filePath) => {
  let json = fs.readFileSync(filePath, "utf8");
  return JSON.parse(json);
};

const readConfig = async () => {
  const shelbysamConfig = toml.parse(
    fs.readFileSync("shelbysam-config.toml", "utf8")
  );
  return shelbysamConfig;
};

export { readFileToJson, readJson, readConfig };
