import yaml from "js-yaml";
import fs from "fs/promises";

// deconstructing loop
const deconstructingLoop = async (template, args, keysL1, keysL2) => {
  // const handler to reuse the function for init and deconstruct
  const name = args.name ? args.name + "/" : "";

  console.log("asdn", name, args.path);
  //create dir
  await fs.mkdir(name + args.path, { recursive: true });
  // loop through the template
  for (const [k, v] of Object.entries(template)) {
    // create files for the selected keys - l1
    if (keysL1.includes(k)) {
      const newFileTemplate = JSON.parse(JSON.stringify(v, null, 4));
      await fs.writeFile(
        name + args.path + "/" + k + ".yml",
        yaml.dump(newFileTemplate)
      );
      template[k] = "${file:" + args.path + "/" + k + ".yml" + "}";
    }
    // create files for the selected keys - l2
    else if (keysL2.includes(k)) {
      template[k] = await deconstructingLoop(
        template[k],
        { name: args.name, path: args.path + "/" + k },
        Object.keys(template[k]),
        []
      );
    }
  }
  return template;
};

export { deconstructingLoop };
