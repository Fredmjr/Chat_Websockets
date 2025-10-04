//html mapping for messages on map by click profler function
/*<div
  class="mgscrd"
  data-id="${
                                    msg.id
                                  }"
  data-pstn="${msg.from}"
>
  <div class="mgscrdCnt">
    <p class="singlemgscl">${msg.message}</p>
    <span class="mgsftnote">
      From ${msg.from} to ${msg.to} -- $
      {new Date(msg.createdAt).toLocaleString()}
    </span>
  </div>
</div>;

*/

//////2. CLICK PROFILER FUNCTION
// Profiler mapping messages based on click
/* (Cuc = () => {
  const Home = document.querySelector(".Home");
  //to find usrcl the button for search users
  const proflrobsrvr = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        const nodeusrcl = node.matches?.(".usrcl")
          ? node
          : node.querySelector?.(".usrcl");

        if (nodeusrcl) {
          Home.addEventListener("click", function (event) {
            if (event.target.matches(".usrcl")) {
              console.log("user button was clicked!");
              //1.PROFILER MGS
              //mnchtMgs  Function to find message div for messages purpose!
              const mnchtMgsobsrvr = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                  mutation.addedNodes.forEach((node) => {
                    const nodemnchtMgs = node.matches?.(".mnchtMgs")
                      ? node
                      : node.querySelector?.(".mnchtMgs");

                    const nodechtsbmtBtn = node.matches?.(".chtsbmtBtn")
                      ? node
                      : node.querySelector?.(".chtsbmtBtn");

                    if (nodechtsbmtBtn) {
                      console.log("we have message div nodechtsbmtBtn");
                      nodechtsbmtBtn.addEventListener("click", () => {
                        autockie = (elem) => {
                          let ckies = document.cookie.split("; ");
                          for (let i = 0; i < ckies.length; i++) {
                            let cookie = ckies[i];
                            let [name, value] = cookie.split("=");
                            if (name === elem) {
                              return decodeURIComponent(value);
                            }
                          }
                          return null;
                        };

                        let sltdusrp = autockie("targtdusrprt");
                        let lgrusrp = autockie("usrP");
                        const prtsObj = {
                          lgrsur: lgrusrp,
                          sltdusr: sltdusrp,
                        };
                        console.log(
                          `both loger: ${lgrusrp} & recepient: ${sltdusrp}`
                        );

                        fetch("/mgs/prtsmgs", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            // 'Authorization': 'Bearer YOUR_TOKEN',
                          },
                          body: JSON.stringify(prtsObj),
                        })
                          .then((response) => response.text())
                          .then((data) => {
                            if (data) {
                              //Messages

                              const datadt = JSON.parse(data); // Parse the JSON string

                              if (Array.isArray(datadt)) {
                                nodemnchtMgs.innerHTML = ""; // Clear the panel first

                                datadt.forEach((msg) => {
                                  const msgDiv = document.createElement("div");
                                  msgDiv.innerHTML = `
                                  <div class="mgscrd" data-id="${
                                    msg.id
                                  }" data-pstn="${msg.from}">

                                  <div class="mgscrdCnt"><p class="singlemgscl">${
                                    msg.message
                                  }</p>
                                  <span class="mgsftnote">From ${msg.from} to ${
                                    msg.to
                                  } -- ${new Date(
                                    msg.createdAt
                                  ).toLocaleString()}</span>
                                  
                                  </div>
                                  </div> `;
                                  nodemnchtMgs.appendChild(msgDiv);
                                });
                              }
                              console.log(data);
                            }
                          })
                          .catch((error) => console.log(error));
                      });
                    }
                  });
                });
              });

              mnchtMgsobsrvr.observe(Home, { childList: true, subtree: true });
            }
          });
        }
      });
    });
  });

  proflrobsrvr.observe(Home, { childList: true, subtree: true });
})();
 */

//SOCK FOR CLICK MGS PROFILER FUNCTION
/* 
import { WebSocketServer } from "ws";

const server = new WebSocketServer({
  port: 1001,
});

const clients = new Set();

server.on("connection", (ws) => {
  clients.add(ws);
  console.log("connected: " + clients.size);

  ws.on("message", (message) => {
    (message.toString());
    for (const client of clients) {
      if (client !== ws  && client.readyState === client.OPEN ) {
        client.send("message received:" + message.toString());
      }
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("closed" + clients.size);
  });
  ws.send("welcome");
});

/* server.close();
console.log("server running on port 1001"); */

//FULL SOCKET
/* (function webskt() {
  const server = new WebSocketServer({
    port: 2001,
  });

  const clients = new Set();

  server.on("connection", (ws) => {
    clients.add(ws);
    console.log("connected usrs: " + clients.size);
    ws.on("message", (message) => {
      console.log(message.toString());
      const prsdObj = JSON.parse(message);
      const selectedprt = prsdObj.sltdusr;
      const logerprt = prsdObj.lgrusr;
      console.log(logerprt, selectedprt);
      async function websk() {
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

            const bothmgs = [...messages1, ...messages2];

            const sortedbothmgs = bothmgs.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );

            const cnvrtdMgs = sortedbothmgs.map((msg) => msg.toJSON());

            if (cnvrtdMgs) {
              for (const client of clients) {
                if (client !== ws && client.readyState === client.OPEN) {
                  client.send(JSON.stringify(cnvrtdMgs));
                }
              }
            }
          } else {
            res.send("Unable to send message!");
          }
        } catch (error) {
          console.log(error);
        }
      }
      websk();
    });
    ws.on("close", () => {
      clients.delete(ws);
      console.log("closed" + clients.size);
      console.log("closed");
    });
  });
})();
 */
