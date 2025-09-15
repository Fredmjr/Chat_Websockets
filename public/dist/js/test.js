var o=new WebSocket("ws://localhost:8101");o.addEventListener("open",()=>{console.log("we are connected")});o.addEventListener("message",e=>{console.log(e.data),logId.textContent=e.data});
//# sourceMappingURL=test.js.map
