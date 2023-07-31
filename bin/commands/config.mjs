#!/usr/bin/env node
import fs from "fs";
import json2toml from "json2toml";
import { readConfig } from "../utils/helper.mjs";

const cfr = {
  "us-east-1":
    "https://d1uauaxba7bl26.cloudfront.net/latest/gzip/CloudFormationResourceSpecification.json",
  "us-east-2":
    "https://dnwj8swjjbsbt.cloudfront.net/latest/gzip/CloudFormationResourceSpecification.json",
  "us-west-1":
    "https://d68hl49wbnanq.cloudfront.net/latest/gzip/CloudFormationResourceSpecification.json",
  "us-west-2":
    "https://d201a2mn26r7lk.cloudfront.net/latest/gzip/CloudFormationResourceSpecification.json",
  "ap-south-1":
    "https://d2senuesg1djtx.cloudfront.net/latest/gzip/CloudFormationResourceSpecification.json",
  "ap-south-2":
    "https://cfn-resource-specifications-ap-south-2-prod.s3.ap-south-2.amazonaws.com/latest/gzip/CloudFormationResourceSpecification.json",
  "af-south-1":
    "https://cfn-resource-specifications-af-south-1-prod.s3.af-south-1.amazonaws.com/latest/gzip/CloudFormationResourceSpecification.json",
  "ap-east-1":
    "https://cfn-resource-specifications-ap-east-1-prod.s3.ap-east-1.amazonaws.com/latest/gzip/CloudFormationResourceSpecification.json",
  "ap-northeast-1":
    "https://d33vqc0rt9ld30.cloudfront.net/latest/gzip/CloudFormationResourceSpecification.json",
  "ap-northeast-2":
    "https://d1ane3fvebulky.cloudfront.net/latest/gzip/CloudFormationResourceSpecification.json",
  "ap-northeast-3":
    "https://d2zq80gdmjim8k.cloudfront.net/latest/gzip/CloudFormationResourceSpecification.json",
  "ap-southeast-1":
    "https://doigdx0kgq9el.cloudfront.net/latest/gzip/CloudFormationResourceSpecification.json",
  "ap-southeast-2":
    "https://d2stg8d246z9di.cloudfront.net/latest/gzip/CloudFormationResourceSpecification.json",
  "ap-southeast-3":
    "https://cfn-resource-specifications-ap-southeast-3-prod.s3.ap-southeast-3.amazonaws.com/latest/CloudFormationResourceSpecification.json",
  "ap-southeast-4":
    "https://cfn-resource-specifications-ap-southeast-4-prod.s3.ap-southeast-4.amazonaws.com/latest/CloudFormationResourceSpecification.json",
  "ca-central-1":
    "https://d2s8ygphhesbe7.cloudfront.net/latest/gzip/CloudFormationResourceSpecification.json",
  "cn-north-1":
    "https://cfn-resource-specifications-cn-north-1-prod.s3.cn-north-1.amazonaws.com.cn/latest/gzip/CloudFormationResourceSpecification.json",
  "cn-northwest-1":
    "https://cfn-resource-specifications-cn-northwest-1-prod.s3.cn-northwest-1.amazonaws.com.cn/latest/gzip/CloudFormationResourceSpecification.json",
  "eu-central-1":
    "https://d1mta8qj7i28i2.cloudfront.net/latest/gzip/CloudFormationResourceSpecification.json",
  "eu-central-2":
    "https://cfn-resource-specifications-eu-central-2-prod.s3.eu-central-2.amazonaws.com/latest/gzip/CloudFormationResourceSpecification.json",
  "eu-north-1":
    "https://diy8iv58sj6ba.cloudfront.net/latest/gzip/CloudFormationResourceSpecification.json",
  "eu-south-1":
    "https://cfn-resource-specifications-eu-south-1-prod.s3.eu-south-1.amazonaws.com/latest/gzip/CloudFormationResourceSpecification.json",
  "eu-south-2":
    "https://cfn-resource-specifications-eu-south-2-prod.s3.eu-south-2.amazonaws.com/latest/gzip/CloudFormationResourceSpecification.json",
  "eu-west-1":
    "https://d3teyb21fexa9r.cloudfront.net/latest/gzip/CloudFormationResourceSpecification.json",
  "eu-west-2":
    "https://d1742qcu2c1ncx.cloudfront.net/latest/gzip/CloudFormationResourceSpecification.json",
  "eu-west-3":
    "https://d2d0mfegowb3wk.cloudfront.net/latest/gzip/CloudFormationResourceSpecification.json",
  "me-central-1":
    "https://cfn-resource-specifications-me-central-1-prod.s3.me-central-1.amazonaws.com/latest/gzip/CloudFormationResourceSpecification.json",
  "me-south-1":
    "https://cfn-resource-specifications-me-south-1-prod.s3.me-south-1.amazonaws.com/latest/gzip/CloudFormationResourceSpecification.json",
  "sa-east-1":
    "https://d3c9jyj3w509b0.cloudfront.net/latest/gzip/CloudFormationResourceSpecification.json",
  "us-gov-east-1":
    "https://s3.us-gov-east-1.amazonaws.com/cfn-resource-specifications-us-gov-east-1-prod/latest/CloudFormationResourceSpecification.json",
  "us-gov-west-1":
    "https://s3.us-gov-west-1.amazonaws.com/cfn-resource-specifications-us-gov-west-1-prod/latest/CloudFormationResourceSpecification.json",
};
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html

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
