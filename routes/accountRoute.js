/* ****************************
 *  Account routes
 * **************************** */

// Needed Resources 
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')
const utilities = require("../utilities/index")

// Route to account login page

router.get("/login", accountController.buildLogin)

// Route to register page

router.get("/register", accountController.buildRegister)

// Route to registration confirmation page

router.post(
    "/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    accountController.registerAccount
)

// Process the login attempt
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    accountController.accountLogin
)

// Route to account management view

router.get("/", utilities.checkLogin, accountController.buildaccountManagement)

// Route to edit account view

router.get("/update", accountController.buildEditAccount)

// Process the edit account info attempt

router.post(
    "/update-account",
    regValidate.updateAccountRules(),
    regValidate.checkUpdateData,
    accountController.accountUpdateEmail
)

// Process the edit password attempt

router.post(
    "/update-password",
    regValidate.updatePasswordRules(),
    regValidate.checkUpdateData,
    accountController.accountUpdatePassword
)

// Process the logout attempt

router.get("/logout", accountController.accountLogout)

module.exports = router;
