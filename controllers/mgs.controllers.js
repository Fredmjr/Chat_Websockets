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
      const message = await mgsModel.create({
        message: chtmgs,
        from: chtlgr,
        to: chtprt,
      });
      if (message) {
        res.send("message sent!");
        console.log(message);
      } else {
        res.send("failed to send message!");
      }
    } else {
      res.send("Unable to send message!");
    }
  } catch (error) {
    console.log(error);
  }
};

//quered messages
export const prtsmgsUrl = async (req, res) => {
  const { sltdusr, lgrsur } = req.body;

  try {
    if (sltdusr && lgrsur) {
      const messages = await mgsModel.findAll({
        where: {
          from: lgrsur,
          to: sltdusr,
        },
      });
      /*   res.send("messages coming"); */
      console.log(lgrsur, sltdusr);
      console.log(messages);
      if (messages) {
        //res.send(messages); --Change .json to .text client fetch req if sending just the message in normal version.

        res.status(200).send(messages);
        //res.status(200).send("New message!");
      }
    } else {
      res.send("Unable to send message!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const scktUrl = async (req, res) => {
  try {
    console.log("websokcets");
    //here add functionality for new message
    res.status(200).send("New message!");
  } catch (error) {
    console.log(error);
  }
};
