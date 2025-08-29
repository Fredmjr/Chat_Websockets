//Auto read cookie function
(cookieFuc = () => {
  getCookie = (cookieName) => {
    let cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let [name, value] = cookie.split("=");
      if (name === cookieName) {
        return decodeURIComponent(value);
      }
    }
    return null;
  };
  let usrn = getCookie("usr");
  let usrprt = getCookie("usrP");
  console.log("cookie name:" + usrn + "cookie port: " + usrprt);

  //send cookie to get token from server in here
  const data = {
    ctoken: usrn,
  };
  console.log(data);
  fetch("/user/ctoken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Authorization': 'Bearer YOUR_TOKEN',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.dtoken === true) {
        console.log(data);

        const profIcon = document.querySelector(".profIcon");
        profIcon.textContent = data.username;
      }
    })
    .catch((error) => console.log(error));
})();
