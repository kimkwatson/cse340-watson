/* ****************************
 *  Account routes
 * **************************** */

// Needed Resources 
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/index")

// Route to account login page

router.get("/login", accountController.buildLogin)

// Route to registration page

router.get("/register", accountController.buildRegister)

module.exports = router;
