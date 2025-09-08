// User auto login
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

  let usrckie = autockie("targtdusrprt");
  const ckieObj = {
    ckie: usrckie,
  };
  console.log("stored selected user port: " + usrckie);
})();
