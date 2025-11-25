const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  let nav = await utilities.getNav()
  let tools = await utilities.getTools()

  if (!data || data.length === 0) {
      req.flash('notice', 'No vehicles found for that classification. Would you like to add new inventory?')
      
      return res.redirect('/inv/management')
    }

  const grid = await utilities.buildClassificationGrid(data)
  const className = data[0].classification_name
  
  return res.render("inventory/classification", {
    title: className + " vehicles",
    tools,
    nav,
    grid,
    errors: null,
  })
}

/* ***************************
 *  Build vehicle page by vehicle id
 * ************************** */

invCont.buildByVehicleId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getVehicleByInvId(inv_id)
  const view = await utilities.buildVehicleView(data)
  const v = data[0]
  let nav = await utilities.getNav()
  let tools = await utilities.getTools()
  const vehicleName = v.inv_year + " " + v.inv_make + " " + v.inv_model
  res.render("inventory/vehicle", {
    title: vehicleName,
    tools,
    nav,
    view,
    errors: null,
  })
}

/* ***************************
 *  Build inventory management view
 * ************************** */

invCont.buildInvManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  let tools = await utilities.getTools()
  const classificationSelect = await utilities.buildClassificationList()
  res.render("inventory/management", {
    title: "Inventory Management",
    tools,
    nav,
    classificationSelect,
    errors: null,
  })
}

/* ***************************
 *  Build add classification form view
 * ************************** */

invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  let tools = await utilities.getTools()
  res.render("inventory/add-classification", {
    title: "Add Classification",
    tools,
    nav,
    errors: null,
  })
}

/* ****************************************
*  Process New Classification
* *************************************** */
invCont.addClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  let tools = await utilities.getTools()
  const { classification_name } = req.body

  const newClassification = await invModel.insertClassification(classification_name)

  if (newClassification) {
    req.flash("notice", `New classification ${classification_name} has been added.`)
    return res.redirect('/inv/management')
  } else {
    return res.status(500).render("inventory/add-classification", {
      title: "Add Classification",
      tools,
      nav,
      errors: [{ message: "Insert failed" }],
    })
  }
}

/* ***************************
 *  Build add inventory form view
 * ************************** */

invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let tools = await utilities.getTools()
  let classification = await utilities.buildClassificationList()
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    tools,
    nav,
    classification,
    errors: null,
  })
}

/* ****************************************
*  Process New Inventory
* *************************************** */
invCont.addInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let tools = await utilities.getTools()
  const {
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
   } = req.body

  const newInv = await invModel.insertInventory({
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  })

  if (newInv) {
    req.flash("notice", `${inv_year} ${inv_make} ${inv_model} has been added to the inventory.`)
    return res.redirect('/inv/management')
  } else {
    return res.status(500).render("inventory/add-classification", {
      title: "Add Classification",
      tools,
      nav,
      errors: [{ message: "Insert failed" }],
    })
  }
}

/* ***************************
 *  Build Edit Inventory View
 * ************************** */
invCont.buildEditInventoryView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  let tools = await utilities.getTools()
  const data = await invModel.getVehicleByInvId(inv_id)
  const itemData = data[0]
  const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    tools,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  })
}

/* ****************************************
*  Update Inventory Data
* *************************************** */
invCont.updateInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let tools = await utilities.getTools()
  const {
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
   } = req.body

  const updateResult = await invModel.updateInventory(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
    inv_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect('/inv/management')
  } else {
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the update failed.")
    res.status(501).render("inventory/edit-inventory", {
      title: "Edit " + itemName,
      tools,
      nav,
      classificationSelect: classificationSelect,
      errors: null,
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    })
  }
}


/* ***************************
 *  Build Error Page
 * ************************** */

invCont.buildErrorPage = async function (req, res, next) {
  const error = new Error
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ***************************
 *  Build Delete Inventory View
 * ************************** */
invCont.buildDeleteView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  let tools = await utilities.getTools()
  const data = await invModel.getVehicleByInvId(inv_id)
  const itemData = data[0]
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/delete-inventory", {
    title: "Delete " + itemName,
    tools,
    nav,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_price: itemData.inv_price,
  })
}

/* ****************************************
*  Delete Inventory Data
* *************************************** */
invCont.deleteInventory = async function (req, res, next) {
  const inv_id = parseInt(req.body.inv_id)

  const deleteResult = await invModel.deleteInventoryItem(inv_id)

  if (deleteResult) {
    req.flash("notice", "The deletion was successful.")
    res.redirect('/inv/management')
  } else {
    req.flash("notice", "Sorry, the delete failed.")
    res.status(501).redirect("inventory/delete-inventory/inv_id")
  }
}

module.exports = invCont