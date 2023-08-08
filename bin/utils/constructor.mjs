import { readYaml } from "./helper.mjs";
import { fileRegex, fileObjectRegex } from "../utils/constants.mjs";

// recursive loop to parse shelbysam syntax
const constructingLoop = async (data) => {
  for (const [k, v] of Object.entries(data)) {
    if (typeof v === "object") {
      data[k] = await constructingLoop(v);
    } else if (typeof v === "string") {
      let matchedRegex1 = [...v.matchAll(fileObjectRegex)];
      if (matchedRegex1 !== null && matchedRegex1.length > 0) {
        let temp = await readYaml(matchedRegex1[0][1]);
        data[k] = temp[matchedRegex1[0][2]];
      } else {
        let matchedRegex2 = [...v.matchAll(fileRegex)];
        if (matchedRegex2 !== null && matchedRegex2.length > 0) {
          data[k] = await readYaml(matchedRegex2[0][1]);
        }
      }
    }
  }
  return data;
};

export { constructingLoop };
