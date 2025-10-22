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

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  let register = await utilities.buildRegister()
  res.render("account/register", {
    title: "Register",
    nav,
    register,
    errors: null,
  })
}

module.exports = { buildLogin, buildRegister }