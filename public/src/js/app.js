const inputID = document.querySelector("#inputID");
const logId = document.querySelector("#logId");
const loginBtn = document.querySelector(".loginBtn");
const subloginBtn = document.querySelector(".subloginBtn");
const Home = document.querySelector(".Home");

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

loginBtn.addEventListener("click", () => {
  fetch("/user/login", {
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
});

//Login
/* document.addEventListener("DOMContentLoaded", () => {
  subloginBtn.addEventListener("click", () => {
    console.log("logined in");
  });
});
 */
//this is useful for dynamically render element to be used in document.something
Home.addEventListener("click", function (event) {
  if (event.target.matches(".subloginBtn")) {
    const usernameInput = document.querySelector(".usernameInput").value;
    const emailInput = document.querySelector(".emailInput").value;
    const passwordInput = document.querySelector(".passwordInput").value;
    const erPlank = document.querySelector(".erPlank");

    //Logins validfications
    const data = {
      username: usernameInput,
      email: emailInput,
      password: passwordInput,
    };
    console.log(data);

    fetch("/user/verification", {
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
        } else if (data.redirMgs === true) {
          console.log("page redirect");
        } else {
          erPlank.innerHTML = "Failed, Please reload the page and try again!";
          erPlank.style.display = "block";
          setTimeout(() => {
            erPlank.style.display = "none";
          }, 3000);
          console.log("correct p");
        }
      })
      .catch((error) => console.log(error));
  }
});
