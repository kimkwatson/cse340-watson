const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
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
  res.render("./inventory/vehicle", {
    title: vehicleName,
    nav,
    view,
  })
}

module.exports = invCont