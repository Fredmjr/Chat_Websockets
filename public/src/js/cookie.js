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
  getCookie("usr");
  let username = getCookie("usr");
  console.log(username);
  console.log("cookie here");
})();
