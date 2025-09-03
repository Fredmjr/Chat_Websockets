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
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
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
