import mgsModel from "../models/mgs.model.js";
import { WebSocketServer } from "ws";

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
      res.send("Input is empty, unable to send message!");
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
      const messages1 = await mgsModel.findAll({
        where: {
          from: lgrsur,
          to: sltdusr,
        },
      });
      const messages2 = await mgsModel.findAll({
        where: {
          from: sltdusr,
          to: lgrsur,
        },
      });
      //comnation of messages (two arrays)
      const bothmgs = [...messages1, ...messages2];
      //sorting the array of messages based on date and time (createdAt)
      const sortedbothmgs = bothmgs.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      /*   res.send("messages coming"); */
      console.log(lgrsur, sltdusr);
      console.log(sortedbothmgs);
      if (sortedbothmgs) {
        //res.send(messages); --Change .json to .text client fetch req if sending just the message in normal version.

        res.status(200).send(bothmgs);
        //res.status(200).send("New message!");
      }
    } else {
      res.send("Unable to send message!");
    }
  } catch (error) {
    console.log(error);
  }
};

//websockt messages
//Major updated changes to your original socket code bro
(function webskt() {
  const server = new WebSocketServer({
    port: 8380,
  });
  const clients = new Map(); //1. Tracking each conncted users

  server.on("connection", (ws) => {
    ws.on("message", async (message) => {
      //2. Added async to this instead of a function like async function websk() {} which is unnecessary.
      console.log(message.toString());
      const prsdObj = JSON.parse(message);
      const selectedprt = prsdObj.sltdusr;
      const logerprt = prsdObj.lgrusr;
      console.log(logerprt, selectedprt);
      //3. Saved the connection to the logerport (sender) the use it to send message that comes  from a receiver (selectedprt).
      if (logerprt) {
        clients.set(logerprt, ws);
      }

      try {
        if (logerprt && selectedprt) {
          const messages1 = await mgsModel.findAll({
            where: {
              from: logerprt,
              to: selectedprt,
            },
          });
          const messages2 = await mgsModel.findAll({
            where: {
              from: selectedprt,
              to: logerprt,
            },
          });
          //comnation of messages (two arrays)
          const bothmgs = [...messages1, ...messages2];
          //sorting the array of messages based on date and time (createdAt)
          const sortedbothmgs = bothmgs.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );

          //converting to plain text from SequelizeInstance format data
          const cnvrtdMgs = sortedbothmgs.map((msg) => msg.toJSON());
          //4. stringified converted messages the server must send a stringified JSON, that's how WebSocket communication works.
          const stringifiedData = JSON.stringify(cnvrtdMgs);

          //5. Send to sender (logerprt)
          if (clients.has(logerprt)) {
            clients.get(logerprt).send(stringifiedData);
          }

          // 6. Send to recipient (selectedprt)
          if (selectedprt !== logerprt && clients.has(selectedprt)) {
            clients.get(selectedprt).send(stringifiedData);
          }
        } else {
          ws.send("Unable to send message!");
        }
      } catch (error) {
        console.log(error);
      }
    });
    ws.on("close", () => {
      //7.
      for (const [user, socket] of clients.entries()) {
        if (socket === ws) {
          clients.delete(user);
          break;
        }
      }
      console.log("closed");
    });
  });
})();

//Delete this function below, was suppposed to be used for websocket!
export const scktUrl = async (req, res) => {
  try {
    console.log("websokcets");
    //here add functionality for new message
    res.status(200).send("New message!");
  } catch (error) {
    console.log(error);
  }
};
