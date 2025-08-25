import { WebSocketServer } from "ws";
import dotenv from "dotenv";

dotenv.config();
const server = new WebSocketServer({
  port: `${process.env.APP_PORT}`,
});

server.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log(message.toString());
    ws.send("message received:" + message.toString());
  });

  ws.on("close", () => {
    console.log("closed");
  });
  ws.send("welcome");
});

console.log("server running on port: " + process.env.APP_PORT);
