# ShelbySAM

`ShelbySAM` is a transformative npm package that streamlines SAM templates. Simplify your cloudformation journey with ShelbySAM's intuitive "construction" and "deconstruction" features, making cloud management a breeze.It effortlessly splits a complex YAML file into individual resource-specific files, fostering easy maintenance and scalability.

You can also seamlessly add new resources, Shelbysam dynamically fetches essential parameters from the CloudFormation registry. Plus you can clone or remove existing resources.

## Installation

The NPM package is available [here](https://www.npmjs.com/package/@antstackio/shelbysam). Install the package globally using the following command.

`npm install -g @antstackio/shelbysam`

## Configuration

`shelbysam config`

This creates the `shelbysam-config.toml` which is used to store the configurations. There are 4 parameters being stored

1. region - Sets the region of the deployment.
2. sam_template_file - The template file used for deploying the SAM Application. Defaults to `template.yaml`
3. shelbysam_template_file = The deconstructed template file name. Defaults to `shelbysam.yaml`
4. shelbysam_template_folder = The folder to store the deconstructed resources. Defaults to `infra_resources`

## Deconstruct using ShelbySAM

`shelbysam deconstruct`

The deconstruct command takes an existing template (`sam_template_file`) file as input and deconstructs it onto the specified folder (`shelbysam_template_folder`). It will also create a deconstructed template file (`shelbysam_template_file`) file which will be used for further processing.

Flags

--template, -t : The template file to be deconstructed. Defaults to `sam_template_file` or `template.yaml`

--path, -p : The folder to store deconstructed resources. Defaults to `shelbysam_template_folder` or `infra_resources`

Both the flags are optional. If the flags are not specified ShelbySAM will pick up the information from the `shelbysam-config.toml`.

## Construct using ShelbySAM

`shelbysam construct`

The construct command creates the final SAM template file from the ShelbySAM template file.

Flags

--itemplate, -i : Input template file. Defaults to `shelbysam_template_file` or `shelbysam.yaml`

--otemplate, -o : Output template file. Defaults to `sam_template_file` or `template.yaml`

Both the flags are optional. If the flags are not specified ShelbySAM will pick up the information from the `shelbysam-config.toml`.

## Add Resource using ShelbySAM

The add command creates resource file with the respective template and adds it to the final template

Flags

--type, -t : The cloudformation type. eg : `AWS::Lambda::Function"

--lid, -i : The logical id for the new resource

## Clone Resource using ShelbySAM

The clone command clones a resource in the existing template.

Flags

--slid, -s : The source logical id of the resource from `shelbysam_template_file`

--dlid, -d : The destination logical if of the resource to be created in `shelbysam_template_file`

--group, -g : If specified, ShelbySAM will clone all the resources in the group

## Remove using ShelbySAM

The remove command creates resource file with the respective template and also removes it to the final template

Flags

--lid, -i : The logical id for the resource to be removed

## Path References

- `Resource1: "${file:./infra/resource1.yml}"` - Direct file reference.
- `Resource1: "${file:./infra/resource.yml:resource1}"` - File reference with nested resources / Group Resources.
