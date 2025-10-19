const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span id="inv-display--price">$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the vehicle view HTML
* ************************************ */

Util.buildVehicleView = async function(data) {
  let view
  if(data.length > 0){
    const v = data[0]
    view = '<div id="view-image"><img src="' + v.inv_image
    +'" alt="Image of '+ v.inv_make + ' ' + v.inv_model
    +' on CSE Motors" /></div>'
    view += '<ul id="view-details"><h2 id="view-title">'
    + v.inv_make + ' ' + v.inv_model + ' Details' + '</h2>'
    view += '<li class="view-list"><h2 id="view-price">Price:   '
    view += '<span id="view-price__amount">$' 
    + new Intl.NumberFormat('en-US').format(v.inv_price) + '</span>'
    view += '</h2></li>'
    view += '<li class="view-list"><h2 id="view-description">Description: '
    view += '<span id="view-description__blurb">'
    + v.inv_description + '</span></h2></li>'
    view += '<li class="view-list"><h2 id="view-mileage__title">Color: '
    view += '<span id=view-color__color>' + v.inv_color + '</span></h2></li>'
    view += '<li class="view-list"><h2 id="view-mileage__title">Mileage: '
    view += '<span id="view-mileage__miles">' + new Intl.NumberFormat('en-US').format(v.inv_miles) + '</span></h2></li>'
    view += '</ul>'
  }else { 
    view += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return view
}


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
  
module.exports = Util