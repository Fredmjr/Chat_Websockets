// Profiler with mgs writer to db function
(Fuc = () => {
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
              //mnchtMgs  Function to find message div for messages purpose!
              const mnchtMgsobsrvr = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                  mutation.addedNodes.forEach((node) => {
                    const nodemnchtMgs = node.matches?.(".mnchtMgs")
                      ? node
                      : node.querySelector?.(".mnchtMgs");

                    if (nodemnchtMgs) {
                      console.log("we have message div");
                      //LOAD SPINNER
                      nodemnchtMgs.innerHTML = `<div>
      <img src="/assests/animations/loading.gif" width="50" alt="" />
    </div>`;
                      //COOKIE RETREIVAL...
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
                            nodemnchtMgs.innerHTML = `${data}`;
                            console.log(data);
                          }
                        })
                        .catch((error) => console.log(error));
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
