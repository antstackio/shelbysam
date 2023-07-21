#!/usr/bin/env node
import { readJson } from "../utils/helper.mjs";
import fs from "fs";
import yaml from "js-yaml";
const documents = [];
let templateRegistry = {};

const identifyType = (key, properties, resource) => {
  // Level 1 processing
  if (Object.keys(properties).includes("PrimitiveType")) {
    // directly return the types, no further processing required
    return properties["PrimitiveType"];
  } else if (Object.keys(properties).includes("PrimitiveItemType")) {
    // directly return the types, but as a list, no further processing required
    return [properties["PrimitiveItemType"]];
  }

  // Level 2 processing - static
  if (key === "Tags") {
    return [{ key: "value" }];
  }

  // Level 2 processing - flex
  if (Object.keys(properties).includes("Type")) {
    let outputTemplate = {};
    let outputType = "json";
    let propertyTemplate = {};
    // sub template definition --> "PropertyTypes"
    if (Object.keys(properties).includes("ItemType")) {
      propertyTemplate =
        templateRegistry.PropertyTypes[resource + "." + properties["ItemType"]];
      outputType = "list";
    } else {
      propertyTemplate =
        templateRegistry.PropertyTypes[resource + "." + properties["Type"]];
      outputType = "json";
    }

    for (const [k, v] of Object.entries(propertyTemplate)) {
      if (k === "Properties") {
        for (const [kk, vv] of Object.entries(v)) {
          outputTemplate[kk] = identifyType(kk, vv, resource);
        }
      }
    }
    if (outputType === "list") return [outputTemplate];
    else return outputTemplate;
  }
};

// Main Function
const add = async (args, command) => {
  // future - read the file dynamically based on region
  templateRegistry = await readJson("cloudformation_registry/ap_south_1.json");

  // main template definition--> "ResourceTypes"
  let outputTemplate = {};
  const resourceTemplate = templateRegistry.ResourceTypes[args.resource];
  for (const [k, v] of Object.entries(resourceTemplate)) {
    if (k === "Properties") {
      for (const [kk, vv] of Object.entries(v)) {
        outputTemplate[kk] = identifyType(kk, vv, args.resource);
      }
    }
  }

  // convert to yaml

  // write the output
  fs.writeFileSync(
    "testing.yaml",
    yaml.dump({
      [args.name]: { Type: args.resource, Properties: outputTemplate },
    })
  );
  return { [args.name]: { Type: args.resource, Properties: outputTemplate } };
};

export { add };
