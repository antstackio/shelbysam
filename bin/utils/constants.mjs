// Regex
const fileRegex = /\$\{file:(.*?)\}/g; // direct file reference
const fileObjectRegex = /\$\{file:([^:}]+):([^}]+)\}/g; // nested file reference
const markdownSyntax = `/*****************************/\nShelbySAM - About the resource\n/*****************************/`

// AWS Regions
const awsRegions = [
  "us-east-1",
  "us-east-2",
  "us-west-1",
  "us-west-2",
  "ap-south-1",
  "ap-south-2",
  "af-south-1",
  "ap-east-1",
  "ap-northeast-1",
  "ap-northeast-2",
  "ap-northeast-3",
  "ap-southeast-1",
  "ap-southeast-2",
  "ap-southeast-3",
  "ap-southeast-4",
  "ca-central-1",
  "cn-north-1",
  "cn-northwest-1",
  "eu-central-1",
  "eu-central-2",
  "eu-north-1",
  "eu-south-1",
  "eu-south-2",
  "eu-west-1",
  "eu-west-1",
  "eu-west-2",
  "eu-west-3",
  "me-central-1",
  "me-south-1",
  "sa-east-1",
  "us-gov-east-1",
  "us-gov-west-1",
];

// Cloudformation Registry
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
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

export { fileRegex, fileObjectRegex, awsRegions, cfr, markdownSyntax};
