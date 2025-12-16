const accountModel = require("../models/account-model")
const bcrypt = require("bcryptjs")
const utilities = require("../utilities/")
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
 
  let nav = await utilities.getNav()
  let tools = await utilities.getTools()
    res.render("account/login", {
    title: "Login",
    tools,
    nav,
    errors: null,
  })
}

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  let tools = await utilities.getTools()
  res.render("account/register", {
    title: "Register",
    tools,
    nav,
    errors: null,
  })
}

/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  let tools = await utilities.getTools()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      tools,
      nav,
      errors: null,
    })
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered, ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      tools,
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Register",
      tools,
      nav,
      errors: null,
    })
  }
}

/* ****************************************
*  Deliver account management view
* *************************************** */
async function buildaccountManagement(req, res, next) {
  let nav = await utilities.getNav()
  let tools = await utilities.getTools()

  const accountData = res.locals.accountData

  if (!accountData) {
    return res.redirect("/account/login")
  }

  const { account_firstname, account_type } = accountData

  res.render("account/management", {
    title: "Account Management",
    tools,
    nav,
    errors: null,
    showAccountInfo: false,
    account_firstname,
    account_type,
  })
}

/* ****************************************
*  Deliver edit account view
* *************************************** */
async function buildEditAccount(req, res, next) {
 
  let nav = await utilities.getNav()
  let tools = await utilities.getTools()

  const account = res.locals.accountData || {}

    res.render("account/update", {
    title: "Edit Account",
    tools,
    nav,
    account_firstname: account.account_firstname,
    account_lastname: account.account_lastname,
    account_email: account.account_email,
    account_id: account.account_id,
    errors: null,
  })
}

/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  let tools = await utilities.getTools()
  const { account_email, account_password } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.")
    res.status(400).render("account/login", {
      title: "Login",
      tools,
      nav,
      errors: null,
      account_email,
    })
    return
  }
  try {
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
      if(process.env.NODE_ENV === 'development') {
        res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
      } else {
        res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
      }
      return res.redirect("/account/")
    }
    else {
      req.flash("message notice", "Please check your credentials and try again.")
      res.status(400).render("account/login", {
        title: "Login",
        tools,
        nav,
        errors: null,
        account_email,
      })
    }
  } catch (error) {
    throw new Error('Access Forbidden')
  }
}

/* ****************************************
 *  Process update account request
 * ************************************ */
async function accountUpdateEmail(req, res) {
  let nav = await utilities.getNav()
  let tools = await utilities.getTools()
  const { account_firstname, account_lastname, account_email, account_id } = req.body

  console.log("🔎 accountUpdateAccount body:", {
    account_firstname,
    account_lastname,
    account_email,
    account_id,
  })

  //const account_id = res.locals.accountData.account_id
  const updateResult = await accountModel.updateAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_id,
  )

  if (updateResult) {
    
    const updatedAccount = await accountModel.getAccountById(account_id)
    try {

      console.log("🔎 updateResult from model:", updateResult)
      if (updatedAccount) {
        delete updatedAccount.account_password
        const accessToken = jwt.sign(updatedAccount, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
        if(process.env.NODE_ENV === 'development') {
          res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
        } else {
          res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
        }

        req.flash("notice",`Thank you, ${account_firstname}. Your account has been succesfully updated.`)
        return res.status(201).render("account/management", {
          title: "Account Management",
          nav,
          tools,
          errors: null,
          showAccountInfo: true,
        })
      }
    else {
      req.flash("notice", "Sorry, the update failed. Please try again.")
      res.status(501).render("account/update", {
        title: "Edit Account",
        tools,
        nav,
        errors: null,
        account_firstname,
        account_lastname,
        account_email,
        account_id,
      })
    }
  } catch (error) {
    throw new Error('Update failed.')
    }
  }
}

/* ****************************************
 *  Process password update
 * ************************************* */

async function accountUpdatePassword(req, res, next) {

  const { account_id, account_password } = req.body
  
  try {

    const hashedPassword = await bcrypt.hash(account_password, 10)
    const updateResult = await accountModel.updatePassword(account_id, hashedPassword)
    //const accountData = await accountModel.getAccountById(account_id)
    
    if(updateResult) {
      req.flash("notice", "Password updated successfully.")
      return res.redirect("/account/")
    } else {
      req.flash("notice", "Sorry, the password update failed. Please try again.")
      return res.redirect("/account/")
    }
  } catch (error) {
    next(error)
  }
}

/* ****************************************
 *  Process logout request
 * ************************************ */

async function accountLogout(req, res) {
  if (process.env.NODE_ENV === 'development') {
    res.clearCookie("jwt", { httpOnly: true, })
  } else {
    res.clearCookie("jwt", { httpOnly: true, secure: true, })
  }

  return res.redirect("/")

}

module.exports = { buildLogin, buildRegister, registerAccount, accountLogin, buildaccountManagement, buildEditAccount, accountUpdateEmail, accountUpdatePassword, accountLogout }