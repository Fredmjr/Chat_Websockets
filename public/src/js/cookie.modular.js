//Simple cookie self invoking function
//use it for quick simple token getting, here usrP is the name(key) of token (value )
const dtest = true;

if (dtest) {
  const lgr = ((usrP) => {
    let ckies = document.cookie.split("; ");
    for (let i = 0; i < ckies.length; i++) {
      let ckie = ckies[i];
      let [name, value] = ckie.split("=");
      if (name === usrP) {
        return decodeURIComponent(value);
      }
    }
    return null;
  })("usrP");
  console.log(lgr);
}

//Dont run this file unless you connect it to something!!
