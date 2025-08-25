import { WebSocketServer } from "ws";

const server = new WebSocketServer({
  port: 8000,
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

console.log("server running on port 8000");
