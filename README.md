# ShelbySAM

`ShelbySAM` is an enhanced wrapper for the AWS SAM CLI, offering additional functionality. It facilitates the deconstruction of a template file into multiple resource files, simplifying maintenance and enabling seamless progress with the template file.

## Pre-requisites

- [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
- [Rain](https://github.com/aws-cloudformation/rain)

## Installation

`npm install -g @antstackio/shelbysam`

## Deconstruct using ShelbySAM

`shelbysam deconstruct --template template.yaml --path deconstructed_resources_path`

The deconstruct command takes an existing template file as input and deconstructs it onto the specified folder. It will also create the `shelbysam.yaml` file which will be used for further processing.

## Construct using ShelbySAM

`shelbysam construct`

The build command constructs the `template.yaml` from the references available in `shelbysam.yaml`.

## Path References

- `Resource1: "${file:./infra/resource1.yml}"` - Direct file reference.
- `Resource1: "${file:./infra/resource.yml:resource1}"` - File reference with nested resources.

## Rules

- `LogicalId` be the same as the deconstructed file name without `.yaml`.

## Clone

- Available only for direct file references
