const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  const tools = await utilities.getTools()
  res.render("index", {title: "Home", tools, nav, errors: null})
}

module.exports = baseController