import express from "express";
import path from "path";
import hbs from "hbs";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";
import sequelize from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import dotenv from "dotenv";

dotenv.config();
let app = express();
app.use(express.json());

//filesetup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "hbs");
app.set("/views", path.join(__dirname, "views", "components"));
hbs.registerPartials(__dirname + "/views/components", function (err) {});
app.use(express.static("public"));

//WS Service - self runnning async function
(async () => {
  const server = new WebSocketServer({
    port: `${process.env.WS_PORT}`,
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
})();

//routes & controllers
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.render("index");
});

//app running & sync sequelize
(async function syncFuc() {
  await sequelize.sync();

  app.listen(`${process.env.APP_PORT}`, () => {
    console.log("Server running on port: " + process.env.APP_PORT);
  });
})();
