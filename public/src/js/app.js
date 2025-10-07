import { connection } from "websocket";

const inputID = document.querySelector("#inputID");
const logId = document.querySelector("#logId");
const loginBtn = document.querySelector(".loginBtn");
const subloginBtn = document.querySelector(".subloginBtn");
const subsignupBtn = document.querySelector(".subsignupBtn");
const Home = document.querySelector(".Home");
const srchErmgs = document.querySelector(".srchErmgs");
const srchpgBtn = document.querySelector(".srchpgBtn");
const usrcl = document.querySelector(".usrcl");

/* const socket = new WebSocket("ws://localhost:8000");
socket.addEventListener("open", () => {
  console.log("we are connected");
}); */

/* socket.addEventListener("message", (event) => {
  console.log(event.data);
  logId.textContent = event.data;
});
//sending data to these server
function sendmgs() {
  socket.send(inputID.value);
} */

Home.addEventListener("click", function (event) {
  if (event.target.matches(".loginBtn")) {
    fetch("/user/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer YOUR_TOKEN',
      },
    })
      .then((response) => response.text())
      .then((data) => {
        if (data) {
          Home.innerHTML = data;
        }
      })
      .catch((error) => console.log(error));
  }
});

//Login
/* document.addEventListener("DOMContentLoaded", () => {
  subloginBtn.addEventListener("click", () => {
    console.log("logined in");
  });
});
 */
//this is useful for dynamically render element to be used in document.something
//LOGIN
Home.addEventListener("click", function (event) {
  if (event.target.matches(".subloginBtn")) {
    const emailInput = document.querySelector(".emailInput").value;
    const passwordInput = document.querySelector(".passwordInput").value;
    const erPlank = document.querySelector(".erPlank");

    //Logins validfications
    const data = {
      email: emailInput,
      password: passwordInput,
    };
    console.log(data);

    fetch("/user/verificaftion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer YOUR_TOKEN',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.erMgs) {
          erPlank.innerHTML = data.erMgs;
          erPlank.style.display = "block";
          setTimeout(() => {
            erPlank.style.display = "none";
          }, 3000);
        } else if (data.paswdMgs) {
          erPlank.innerHTML = data.paswdMgs;
          erPlank.style.display = "block";
          setTimeout(() => {
            erPlank.style.display = "none";
          }, 6000);
        } /* else if (data.redirMgs === true) {
          console.log("page redirect");
        } */ /* else {
          erPlank.innerHTML = "Failed, Please reload the page and try again!";
          erPlank.style.display = "block";
          setTimeout(() => {
            erPlank.style.display = "none";
          }, 3000);
          console.log("correct p");
        } */
      })
      .catch((error) => console.log(error));
  }
});

//SIGNUP PAGE
Home.addEventListener("click", (event) => {
  if (event.target.matches(".siginingupBtn")) {
    fetch("/user/sgnpg", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer YOUR_TOKEN',
      },
    })
      .then((response) => response.text())
      .then((data) => {
        Home.innerHTML = data;
      })
      .catch((error) => console.log(error));
  }
});

//SIGNUP
Home.addEventListener("click", function (event) {
  if (event.target.matches(".subsignupBtn")) {
    const signupusernameInput = document.querySelector(
      ".signupusernameInput"
    ).value;
    const signupemailInput = document.querySelector(".signupemailInput").value;
    const signuppasswordInput = document.querySelector(
      ".signuppasswordInput"
    ).value;
    const ersignupPlank = document.querySelector(".ersignupPlank");

    //Logins validfications
    const data = {
      username: signupusernameInput,
      email: signupemailInput,
      password: signuppasswordInput,
    };
    console.log(data);

    fetch("/user/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer YOUR_TOKEN',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.erMgs) {
          ersignupPlank.innerHTML = data.erMgs;
          ersignupPlank.style.display = "block";
          setTimeout(() => {
            ersignupPlank.style.display = "none";
          }, 3000);
        } else if (data.paswdMgs) {
          ersignupPlank.innerHTML = data.paswdMgs;
          ersignupPlank.style.display = "block";
          setTimeout(() => {
            ersignupPlank.style.display = "none";
          }, 6000);
        } else if (data.crtAccount === true) {
          console.log("Account created!: " + data.usr, data.usrP);
          document.cookie = `usr=${data.usr}` + ";path=/";
          document.cookie = `usrP=${data.usrP}` + ";path=/";
          if (data.redir === true) {
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        }
      })
      .catch((error) => console.log(error));
  }
});

//search user
Home.addEventListener("click", function (event) {
  if (event.target.matches(".fndactBtn")) {
    const fndactInput = document.querySelector(".fndactInput");
    const usrPnl = document.querySelector(".usrPnl");
    let fndVal = fndactInput.value;
    const data = {
      srchVal: fndVal,
    };
    console.log("data");

    fetch("/user/qryusr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer YOUR_TOKEN',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.erMgs) {
          console.log(data.erMgs);
          usrPnl.innerHTML = "";
          usrPnl.innerHTML = data.erMgs;
        } else {
          console.log(data);
          usrPnl.innerHTML = "";
          data.forEach((user) => {
            const p = document.createElement("div");
            p.innerHTML = `
            <p class="usrcl"  data-prt="${user.userport}">${user.username}</p> 
            `;

            const pCnt = p;
            usrPnl.appendChild(pCnt);
          });
        }
      })
      .catch((error) => console.log(error));
  }
});

//query user using dataset data-port
Home.addEventListener("click", function (event) {
  if (event.target.matches(".usrcl")) {
    const targtdusrcl = event.target;
    console.log("hello" + " dataset:" + targtdusrcl.dataset.prt);

    //Storing seleted user port in cookies for 7 days
    //DUCKDB can be use here!!
    (async = () => {
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
      const see = () => {
        document.cookie =
          `targtdusrprt=${encodeURIComponent(targtdusrcl.dataset.prt)}; ` +
          `Secure; SameSite=Strict; expires=${expires.toUTCString()}; path=/`;
        console.log(
          `selected user with ${targtdusrcl.dataset.prt} stored key:targtdusrprt in cookie!`
        );
      };
      see();
    })();

    fetch(`/user/qrysrchusr/${targtdusrcl.dataset.prt}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer YOUR_TOKEN',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.acunt === true) {
          const usrnm = data.nm;

          fetch("/user/srchusrcht", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // 'Authorization': 'Bearer YOUR_TOKEN',
            },
          })
            .then((response) => response.text())
            .then((data) => {
              Home.innerHTML = data;
              const nmcl = document.querySelector(".nmcl");
              nmcl.innerHTML = usrnm;
              nmcl.dataset.prt = targtdusrcl.dataset.prt;
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  }
});

//Dynamically selected elements
//1. Sending message & writing to the db, that only!
//Obbserver for message input field & dataset port for selected user!
const obsrvr = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      //for value of input element
      const nodeinptcl = node.matches?.(".inptcl")
        ? node
        : node.querySelector?.(".inptcl");
      //for dataset span element
      const nodenmcl = node.matches?.(".nmcl")
        ? node
        : node.querySelector?.(".nmcl");

      //1.1 WRITING messsage usrport and seleted usrport TO DB.
      if (nodeinptcl) {
        Home.addEventListener("click", function (event) {
          if (event.target.matches(".chtsbmtBtn")) {
            console.log("dataset for nmcl: " + nodenmcl.dataset.prt);
            console.log("message value for inptcl: " + nodeinptcl.value);
            //sorry for this repeat of data object below, will fix late!!!!
            const data = {
              chtprt: nodenmcl.dataset.prt,
              chtmgs: nodeinptcl.value,
            };

            //Verification of loger user token from cookie, through server, and passed back to client as send message fetch

            if (data) {
              const lgr = ((usrP) => {
                let ckies = document.cookie.split("; ");
                for (let i = 0; i < ckies.length; i++) {
                  let ckie = ckies[i];
                  let [name, value] = ckie.split("=");
                  if (name === usrP) {
                    return decodeURIComponent(value);
                  }
                }
                return null;
              })("usrP");

              if (lgr) {
                const chtdata = {
                  chtprt: nodenmcl.dataset.prt,
                  chtmgs: nodeinptcl.value,
                  chtlgr: lgr,
                };
                console.log(chtdata);
                //Writing Message & staging user prt to server!
                fetch("/mgs/crtmgs", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    // 'Authorization': 'Bearer YOUR_TOKEN',
                  },
                  body: JSON.stringify(chtdata),
                })
                  .then((response) => response.text())
                  .then((data) => {
                    console.log(data);
                  })
                  .catch((error) => console.log(error));
              }
            }
          }
        });
      }
    });
  });
});

obsrvr.observe(Home, { childList: true, subtree: true });

//Dynamically selected elements
//2. Sending message & writing to the db, that only!

/* Home.addEventListener("click", function (event) {
  if (event.target.matches(".usrcl")) {
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        console.log("helo");
      });
    });
  }
}); */

/* Home.addEventListener("click", function (event) {
  if (event.target.matches(".fndactBtn")) {
    const fndactInput = document.querySelector(".fndactInput");
    let fndVal = fndactInput.value;
    console.log(fndVal);
    if (fndVal === "") {
      srchErmgs.textContent = ""; */
//styes block below has issues with esbuild
/* srchErmgs.style.display = "block"; */
/*       setTimeout(() => {
        srchErmgs.style.display = "none";
      }, 2000);
    } else if (fndVal !== "") {
       const data = {
         srchVal: fndVal,
       };
      

      fetch("/user/qryusr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': 'Bearer YOUR_TOKEN',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.text())
        .then((data) => {
          if (data) {
            Home.innerHTML = data;
          }
        })
        .catch((error) => console.log(error));
    }
  }
}); */

Home.addEventListener("click", function (event) {
  if (event.target.matches(".srchpgBtn")) {
    fetch("/user/qrysrchpg", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer YOUR_TOKEN',
      },
    })
      .then((response) => response.text())
      .then((data) => {
        Home.innerHTML = data;
      })
      .catch((error) => console.log(error));
  }
});

/* const profobsrvr = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      //for value of input element
      const nodemnchtMgs = node.matches?.(".mnchtMgs")
        ? node
        : node.querySelector?.(".mnchtMgs");

      //1.1 WRITING messsage usrport and seleted usrport TO DB.
      if (nodemnchtMgs) {
        console.log("mnchtMgs here");
      }
    });
  });
});

profobsrvr.observe(Home, { childList: true, subtree: true }); */
