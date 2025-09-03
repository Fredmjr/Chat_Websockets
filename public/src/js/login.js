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
