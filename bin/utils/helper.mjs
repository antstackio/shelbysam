import { schema } from "yaml-cfn";
import yaml from "js-yaml";
import fs from "fs";
import toml from "toml";
import { fileObjectRegex, fileRegex, markdownSyntax} from "./constants.mjs";

const readFile = async (filename) => {
  const fileString = await fs.readFileSync(filename, "utf8")
  const markdownCheck = fileString.split(markdownSyntax)
  // TODO: Future implementations using markdown
  // if (markdownCheck.length>1){
  //   // markdown exists
  // }
  return markdownCheck[0]
};

// helper function to read yaml file and parse it as json
const readYaml = async (filePath) => {
  try {
    return yaml.load(await readFile(filePath), { schema: schema });  
  } catch (error) {
    console.error("Unable to parse yaml, check syntax in ", filePath)
  }
  
};

// helper function to read json file and parse it as json
const readJson = async (filePath) => {
  return JSON.parse(await readFile(filePath));
};

// helper function to read toml file and parse it as json
const readConfig = async () => {
  return toml.parse(await readFile("shelbysam-config.toml"));
};

// helper function to match regex between single files and object files
const matchRegex = (string) => {
  const matchFileObjectRegex = [...string.matchAll(fileObjectRegex)];
  const matchFileRegex = [...string.matchAll(fileRegex)];
  if (matchFileObjectRegex !== null && matchFileObjectRegex.length > 0) {
    return ["FileObject", matchFileObjectRegex[0]];
  } else if (matchFileRegex !== null && matchFileRegex.length > 0) {
    return ["File", matchFileRegex[0]];
  }else return ["String", string]
};

// helper function to write yaml to file
const writeYaml = async (filepath, content) => {
  fs.writeFileSync(`${filepath}`, yaml.dump(content));
};

export { readYaml, readJson, readConfig, matchRegex, writeYaml };
