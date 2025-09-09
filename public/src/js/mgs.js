(sltdusrFuc = () => {
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
  console.log(`loger: ${lgrusrp} & recepient: ${sltdusrp}`);

  //  Query messages
  const Home = document.querySelector(".Home");
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
        const proflrobsrvr = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              const nodemnchtMgs = node.matches?.(".mnchtMgs")
                ? node
                : node.querySelector?.(".mnchtMgs");

              if (nodemnchtMgs) {
                nodemnchtMgs.innerHTML = `${data}`;
                console.log(data);
              }
            });
          });
        });

        proflrobsrvr.observe(Home, { childList: true, subtree: true });
      }
    })
    .catch((error) => console.log(error));
})();
