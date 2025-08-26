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
    console.log("Logins: " + usernameInput, emailInput, passwordInput);

    //Logins validfications
    fetch("/user/verification", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer YOUR_TOKEN',
      },
    })
      .then((response) => response.text())
      .then((data) => {
        erPlank.innerHTML = data;
        erPlank.style.display = "block";
        /* Home.innerHTML = data; */
      })
      .catch((error) => console.log(error));
  }
});
