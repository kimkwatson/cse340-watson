// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
//const utilities = require("../utilities")

// Route to build inventory by classificatio view
router.get("/type/:classificationId", invController.buildByClassificationId)

// Route to vehicle detail page
router.get("/detail/:invId", invController.buildByVehicleId)

module.exports = router;
