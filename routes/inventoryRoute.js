// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const invValidate = require("../utilities/inventory-validation")
const invAccess = require("../utilities/index")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId)

// Route to vehicle detail view
router.get("/detail/:invId", invController.buildByVehicleId)

// Route to management view
router.get(
    "/management",
    invAccess.checkAdminAccess,
    invController.buildInvManagement
)

// Route to add classification view
router.get(
    "/add-classification",
    invAccess.checkAdminAccess,
    invController.buildAddClassification
)

// Add the classification
router.post(
    "/add-classification",
    invAccess.checkAdminAccess,
    invValidate.classificationRules(),
    invValidate.checkClassData,
    invController.addClassification
)

// Route to add inventory view
router.get(
    "/add-inventory",
    invAccess.checkAdminAccess,
    invController.buildAddInventory
)

// Add the inventory
router.post(
    "/add-inventory",
    invAccess.checkAdminAccess,
    invValidate.inventoryRules(),
    invValidate.checkInvData,
    invController.addInventory
)

// Route to get inventory
router.get("/getInventory/:classification_id", invController.getInventoryJSON)

// Route to edit inventory
router.get(
    "/edit/:inv_id",
    invAccess.checkAdminAccess,
    invController.buildEditInventoryView
)

// Route to inventory update view
router.post(
    "/edit-inventory",
    invAccess.checkAdminAccess,
    invValidate.inventoryRules(),
    invValidate.checkUpdateData,
    invController.updateInventory)

// Route to delete inventory
router.get(
    "/delete/:inv_id",
    invAccess.checkAdminAccess,
    invController.buildDeleteView
)

// Route to delete inventory view
router.post(
    "/delete-inventory",
    invAccess.checkAdminAccess,
    invController.deleteInventory)

module.exports = router;
