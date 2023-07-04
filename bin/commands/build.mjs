#!/usr/bin/env node
import fs from "fs";
import yaml from "js-yaml";
import { spawn } from "child_process";
import { readFileToJson } from "../utils/helper.mjs";

// regex
const fileRegex = /\$\{file:(.*?)\}/g; // direct file reference
const fileObjectRegex = /\$\{file:([^:}]+):([^}]+)\}/g; // nested file reference

// recursive loop to parse shelbysam syntax
const parseShelbySyntax = async (data) => {
  for (const [k, v] of Object.entries(data)) {
    if (typeof v === "object") {
      data[k] = await parseShelbySyntax(v);
    } else if (typeof v === "string") {
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
  // init base file
  let baseTemplate = await readFileToJson("shelbysam.yaml");

  // start the loop
  baseTemplate = await parseShelbySyntax(baseTemplate);

  // write the output
  await fs.writeFileSync("template.yaml", yaml.dump(baseTemplate));

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
