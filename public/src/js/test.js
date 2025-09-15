const socket = new WebSocket("ws://localhost:8101");
socket.addEventListener("open", () => {
  console.log("we are connected");
});

socket.addEventListener("message", (event) => {
  console.log(event.data);
  logId.textContent = event.data;
});
