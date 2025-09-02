import { connection } from "websocket";

const inputID = document.querySelector("#inputID");
const logId = document.querySelector("#logId");
const loginBtn = document.querySelector(".loginBtn");
const subloginBtn = document.querySelector(".subloginBtn");
const subsignupBtn = document.querySelector(".subsignupBtn");
const Home = document.querySelector(".Home");
const srchErmgs = document.querySelector(".srchErmgs");
const srchpgBtn = document.querySelector(".srchpgBtn");

const socket = new WebSocket("ws://localhost:8000");
socket.addEventListener("open", () => {
  console.log("we are connected");
});

socket.addEventListener("message", (event) => {
  console.log(event.data);
  logId.textContent = event.data;
});
//sending data to these server
function sendmgs() {
  socket.send(inputID.value);
}

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
          console.log(data.usr, data.usrP + "herererer");
          document.cookie = `usr=${data.usr}` + ";path=/";
          document.cookie = `usrP=${data.usrP}` + ";path=/";
          /*           document.cookie = "usr=data.usr" + ";path=/";

          getCookie=(cookieName)=>{
         let cookies = document.cookie.split("; ");

            for (let i = 0; i < cookies.length; i++) {
              let cookie = cookies[i];
              let [name, value] = cookie.split("=");

              if (name === cookieName) {
                return decodeURIComponent(value);
              }
            }

            return null;
          }

          let username = getCookie("username");
          console.log(username);
        */
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
        console.log(data);
        if (data.usrname) {
          console.log(data.usrname + data.usrprt);
          usrPnl.innerHTML = "";
          data.usrname.forEach((username) => {
            const p = document.createElement("p");
            p.textContent = username;
            p.classList.add("usrcl");
            usrPnl.appendChild(p);
          });
        }
        if (data.erMgs) {
          console.log(data.erMgs);
          /*  usrPnl.innerHTML = data; */
        }
      })
      .catch((error) => console.log(error));
  }
});

//Selected user to user chat sheet
/* const usrcl = document.querySelector(".usrcl");
usrcl.forEach((button) => {
  
}); */
Home.addEventListener("click", function (event) {
  if (event.target.matches(".usrcl")) {
    console.log(data.usrname);
  }
});

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
