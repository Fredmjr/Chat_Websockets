import mgsModel from "../models/mgs.model.js";

//Creating message
export const oneUrl = async (req, res) => {
  const { message, from, to } = req.body;

  try {
    if (message && from && to) {
      const rsltmgs = await mgsModel.create({
        message: message,
        from: from,
        to: to,
      });

      if (rsltmgs) {
        res.send("message crted");
      }
    } else {
      res.send("Unable to send message!");
    }
  } catch (error) {
    console.log(error);
  }
};

//All messages
export const allUrl = async (req, res) => {
  try {
    const rslts = await mgsModel.findAll();
    if (rslts) {
      res.send(rslts);
    } else if (!rslts) {
      res.status(404).send("No messages found!");
    }
  } catch (error) {
    console.log(error);
  }
};

//creating message for chat purpose
export const crtmgsUrl = async (req, res) => {
  const { chtmgs, chtlgr, chtprt } = req.body;

  try {
    if (chtmgs && chtlgr && chtprt) {
      const rsltmgs = await mgsModel.create({
        message: chtmgs,
        from: chtlgr,
        to: chtprt,
      });

      if (rsltmgs) {
        res.send("message sent!");
      }
    } else {
      res.send("Unable to send message!");
    }
  } catch (error) {
    console.log(error);
  }
};
