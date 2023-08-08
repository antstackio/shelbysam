#!/usr/bin/env node
import fs from "fs";
import json2toml from "json2toml";
import { readConfig } from "../utils/helper.mjs";
import { cfr } from "../utils/constants.mjs";

const fetchCF = (region) => {
  fetch(cfr[region])
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      fs.writeFileSync(
        ".shelbysam/" + region + ".json",
        JSON.stringify(data, null, 4),
        { flag: "w" }
      );
    });
};

// Main Function
const config = async (args) => {
  let configExists = true;

  // Check config file
  try {
    const shelbysamConfig = await readConfig();
    // future
    // replace this with existsSync
  } catch (error) {
    if (
      error.message ===
      "ENOENT: no such file or directory, open 'shelbysam-config.toml'"
    ) {
      // delete .shelbysam folder if exists
      const shelbysamFolderExists = fs.existsSync(".shelbysam");
      if (shelbysamFolderExists) fs.rm(".shelbysam", { recursive: true });
      configExists = false;
    }
  }
  // if configuration does not exist, create it
  if (!configExists) {
    fs.mkdirSync(".shelbysam");
  }

  fs.writeFileSync("shelbysam-config.toml", json2toml(args));
  // Fetch the file to create or update it on config command
  fetchCF(args.region);
  return;
};

export { config };
