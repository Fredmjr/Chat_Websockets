import mgsModel from "../models/mgs.model.js";

console.log("server delete all message upon git push");

try {
  const rslts = await mgsModel.findAll({ where: {} });
  if (rslts) {
    /* console.log(rslts); */

    if (rslts.length > 0) {
      await mgsModel.destroy({ truncate: true });
      console.log("all messages deleted");
    } else {
      console.log("Failed to delete all messages!");
    }
  } else if (!rslts) {
    console.log("no messages avaliable");
  }
} catch (error) {
  console.log(error);
}
