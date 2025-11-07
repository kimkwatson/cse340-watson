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

/* **************************************
* Build the account login view HTML - temporarily disabled
* ************************************ 

Util.buildLogin = async function() {
  let login
  login = '<form id="login-form" action="/account/login" method="post">'
  + '<label id="login-email">Email:</label>' + '<input type="email" id="login-email--input" name="account_email" required placeholder="Enter your email">'
  + '<label id="login-password">Password:</label>' + '<p id="register-email--specs">(must contain a minimum of 12 characters, a capital letter, a number, and a special character)</p>'
  + '<input type="password" id="login-password--input" name="account_password" required placeholder="Enter your password" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{12,}$">'
  + '<button id="login__eye-toggle" type="button"><img src="/images/icons/password-hide.png" alt="Show password" width="24" height="24"></button>'
  + '<button id="login-button">Login</button>'
  + '<p id="no-account">No account? ' + '<span id="login-registration--link"><a href="/account/register">Sign up</a></span></p>'
  + '</form>'

  return login
}*/

/* **************************************
* Build the account registration view HTML - temporarily disabled
* ************************************ 

Util.buildRegister = async function() {
  let register
  register = '<form id="register-form" action="/account/register" method="post">'
  + '<label id=register-fname>First name</label>' + '<input type="text" id="register-fname--input" name="account_firstname" required placeholder="Enter your first name" required value="locals.account_firstname">'
  + '<label id=register-lname>Last name</label>' + '<input type="text" id="register-lname--input" name="account_lastname" required placeholder="Enter your last name" required value="<%= locals.account_lastname %>">'
  + '<label id=register-email>Email address</label>' + '<input type="email" id="register-email--input" name="account_email" required placeholder="Enter your email address" required value="<%= locals.account_email %>">'
  + '<label id=register-password>Password</label>' + '<p id="register-email--specs">(must contain a minimum of 12 characters, a capital letter, a number, and a special character)</p>'
  + '<input type="password" id="register-password--input" name="account_password" required placeholder="Choose a password" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{12,}$"">'
  + '<button id="register__eye-toggle" type="button"><img src="/images/icons/password-hide.png" alt="Show password" width="24" height="24"></button>'
  + '<button id="register-button">Register</button>'
  + '</form>'

  return register
} */

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
  
module.exports = Util