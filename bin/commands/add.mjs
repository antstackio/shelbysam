#!/usr/bin/env node
import { readJson, readYaml, readConfig } from "../utils/helper.mjs";
import fs from "fs";
import yaml from "js-yaml";
import { markdownSyntax } from "../utils/constants.mjs";
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
  try {
    // read config file
    const shelbysamConfig = await readConfig();

    // get cloudformation registry
    templateRegistry = await readJson(
      `.shelbysam/${shelbysamConfig.region}.json`
    );

    // read template file
    const shelbysamTemplate = await readYaml(
      shelbysamConfig.shelbysam_template_file
    );

    // main template definition--> "ResourceTypes"
    let outputTemplate = {};
    const resourceTemplate = templateRegistry.ResourceTypes[args.type];
    
    // log document link
    console.log(
      `\n For more information on ${args.type}, visit ${resourceTemplate.Documentation}\n`
    );

    //start processing
    for (const [k, v] of Object.entries(resourceTemplate)) {
      if (k === "Properties") {
        for (const [kk, vv] of Object.entries(v)) {
          outputTemplate[kk] = identifyType(kk, vv, args.type);
        }
      }
    }

    // set resource path
    const shelbysamResourcePath =
      shelbysamConfig.shelbysam_template_folder +
      "/Resources/" +
      args.lid +
      ".yaml";

    // add resource to template
    shelbysamTemplate.Resources[args.lid] =
      "${file:" + shelbysamResourcePath + "}";

    // write the resource file
    fs.writeFileSync(
      shelbysamResourcePath,
      (yaml.dump({ Type: args.type, Properties: outputTemplate }))+markdownSyntax
    );

    // write the final template
    fs.writeFileSync(
      `${shelbysamConfig.shelbysam_template_file}`,
      yaml.dump(shelbysamTemplate)
    );

    return {};
    
  } catch (error) {
    console.error("Unable to add the resource, check the resource type")
  }
};

export { add };
