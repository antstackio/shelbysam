import yaml from "js-yaml";
import fs from "fs/promises";
import { markdownSyntax } from "./constants.mjs";

// deconstructing loop
const deconstructingLoop = async (template, args, keysL1, keysL2) => {
  //create dir
  await fs.mkdir(args.path, { recursive: true });
  // loop through the template
  for (const [k, v] of Object.entries(template)) {
    // create files for the selected keys - l1
    if (keysL1.includes(k)) {
      const newFileTemplate = (JSON.parse(JSON.stringify(v, null, 4)))
      await fs.writeFile(
        args.path + "/" + k + ".yaml",
        yaml.dump(newFileTemplate) + markdownSyntax
      );
      template[k] = "${file:" + args.path + "/" + k + ".yaml" + "}";
    }
    // create files for the selected keys - l2
    else if (keysL2.includes(k)) {
      template[k] = await deconstructingLoop(
        template[k],
        { path: args.path + "/" + k },
        Object.keys(template[k]),
        []
      );
    }
  }
  return template;
};

export { deconstructingLoop };
