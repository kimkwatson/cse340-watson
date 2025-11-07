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

  if (!data || data.length === 0) {
      req.flash('notice', 'No vehicles found for that classification.')
      /*return res.status(404).render('inventory/classification', {
        title: 'No vehicles',
        nav,
        grid: '<h2>No vehicles found.</h2>',
        errors: null,
      })*/
     return res.redirect('/inv/management')
    }

  const grid = await utilities.buildClassificationGrid(data)
  const className = data[0].classification_name
  
  return res.render("inventory/classification", {
    title: className + " vehicles",
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
  const vehicleName = v.inv_year + " " + v.inv_make + " " + v.inv_model
  res.render("inventory/vehicle", {
    title: vehicleName,
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
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
    errors: null,
  })
}

/* ***************************
 *  Build add classification form view
 * ************************** */

invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Process New Classification
* *************************************** */
invCont.addClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body

  const newClassification = await invModel.insertClassification(classification_name)

  if (newClassification) {
    req.flash("notice", `New classification ${classification_name} has been added.`)
    return res.redirect('/inv/management')
  } else {
    return res.status(500).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: [{ message: "Insert failed" }],
    })
  }
}


/* ***************************
 *  Build error page
 * ************************** */

invCont.buildErrorPage = async function (req, res, next) {
  const error = new Error
}

module.exports = invCont