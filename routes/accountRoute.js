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
    (req, res) => {
        res.status(200).send('login process')
    }
)

module.exports = router;
