const utilities = require("../utilities/")

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {

  const login = await utilities.buildLogin();  
  let nav = await utilities.getNav()
    res.render("account/login", {
    title: "Login",
    nav,
    login,
  })
}

module.exports = { buildLogin }