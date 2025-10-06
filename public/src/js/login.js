// User auto login
(autolg = () => {
  console.log("auto loging");
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

  let usrckie = autockie("usr");
  const ckieObj = {
    ckie: usrckie,
  };
  console.log(usrckie);

  fetch("/user/autlg", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Authorization': 'Bearer YOUR_TOKEN',
    },
    body: JSON.stringify(ckieObj),
  })
    .then((response) => response.text())
    .then((data) => {
      document.body.innerHTML = data;
    })
    .catch((error) => console.log(error));
})();

//DOCUMENT DOM MUTATION OBSERVER
//body DOM mutation observer
const bodyDOM = document.querySelector("body");
const obsrvrDOM = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      const nodeloginPage = node.matches?.(".loginPage")
        ? node
        : node.querySelector?.(".loginPage");

      const nodeemailInput = node.matches?.(".emailInput")
        ? node
        : node.querySelector?.(".emailInput");

      const nodepasswordInput = node.matches?.(".passwordInput")
        ? node
        : node.querySelector?.(".passwordInput");

      const nodeerPlank = node.matches?.(".erPlank")
        ? node
        : node.querySelector?.(".erPlank");

      if (nodeloginPage) {
        //loginPage element delegtion observer (for click of subloginBtn)
        nodeloginPage.addEventListener("click", function (event) {
          if (event.target.matches(".subloginBtn")) {
            console.log("doc.body mutation works!");
            const plam = true;
            if (plam === true || plam !== false) {
              const dataObj = {
                email: nodeemailInput.value,
                password: nodepasswordInput.value,
              };
              console.log(dataObj);

              fetch("/user/verificaftion", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  // 'Authorization': 'Bearer YOUR_TOKEN',
                },
                body: JSON.stringify(dataObj),
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.erMgs) {
                    nodeerPlank.textContent = data.erMgs;
                    setTimeout(() => {
                      nodeerPlank.style.display = "none";
                    }, 1000);
                    nodeerPlank.style.display = "block";
                    console.log(data.erMgs);
                  } else if (data.paswdMgs) {
                    nodeerPlank.textContent = data.paswdMgs;
                    nodeerPlank.style.display = "block";
                    setTimeout(() => {
                      nodeerPlank.style.display = "none";
                    }, 2000);
                    console.log(data.paswdMgs);
                  } else if (data.ifRedir) {
                    const setnm = (document.cookie =
                      `usr=${data.usr}` + ";path=/");
                    const setprt = (document.cookie =
                      `usrP=${data.usrP}` + ";path=/");

                    if (setnm && setprt) {
                      console.log(
                        `cookie set name: ${data.usr} port & ${data.usrP}`
                      );
                      setTimeout(() => {
                        window.location.reload();
                      }, 1000);
                    }
                  }
                })
                .catch((error) => console.log(error));
            }
          }
        });
      }
    });
  });
});

obsrvrDOM.observe(bodyDOM, { childList: true, subtree: true });

//1.1 Swtich from login to Signup page (1.Sigup page)
const Home_DOM = document.querySelector(".Home");
if (bodyDOM) {
  const sgupnpgobsrvr = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        const nodesignup_Btn = node.matches?.(".signup_Btn")
          ? node
          : node.querySelector?.(".signup_Btn");

        if (nodesignup_Btn) {
          nodesignup_Btn.addEventListener("click", () => {
            fetch("/user/sgnpg", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                // 'Authorization': 'Bearer YOUR_TOKEN',
              },
            })
              .then((response) => response.text())
              .then((data) => {
                document.body.innerHTML = data;
                //
              })
              .catch((error) => console.log(error));
          });
        }
      });
    });
  });

  sgupnpgobsrvr.observe(document.body, { childList: true, subtree: true });
}

//1.2 Swtich from login to Signup page (2.Register new user, 3.Set token & 4.Then home page
if (bodyDOM) {
  const jgobsrvr = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        const nodesubsignupBtn = node.matches?.(".subsignupBtn")
          ? node
          : node.querySelector?.(".subsignupBtn");

        if (nodesubsignupBtn) {
          nodesubsignupBtn.addEventListener("click", () => {
            console.log("form");
            const signupusernameInput = document.querySelector(
              ".signupusernameInput"
            ).value;
            const signupemailInput =
              document.querySelector(".signupemailInput").value;
            const signuppasswordInput = document.querySelector(
              ".signuppasswordInput"
            ).value;
            const ersignupPlank = document.querySelector(".ersignupPlank");

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
          });
        }
      });
    });
  });

  jgobsrvr.observe(document.body, { childList: true, subtree: true });
}
