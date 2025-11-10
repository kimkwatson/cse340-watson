// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId)

// Route to vehicle detail view
router.get("/detail/:invId", invController.buildByVehicleId)

// Route to management view
router.get("/management", invController.buildInvManagement)

// Route to add classification view
router.get("/add-classification", invController.buildAddClassification)

// Add the classification
router.post(
    "/add-classification",
    invValidate.classificationRules(),
    invValidate.checkClassData,
    invController.addClassification
)

// Route to add inventory view
router.get("/add-inventory", invController.buildAddInventory)

// Add the inventory
router.post(
    "/add-inventory",
    invValidate.inventoryRules(),
    invValidate.checkInvData,
    invController.addInventory
)

module.exports = router;
