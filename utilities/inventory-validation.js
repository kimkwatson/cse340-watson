const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
  *  Classification Name Validation Rules
  * ********************************* */
  validate.classificationRules = () => {
    return [
      // classification is required
      body("classification_name")
        .trim()  
        .notEmpty()
        .escape()
        .matches(/^[A-Za-z0-9]+$/)
        .withMessage("Please provide a classification name with letters only - no spaces or special characters.") // on error this message is sent.
    ]
  }

/*  **********************************
  *  Inventory Data Validation Rules
  * ********************************* */
  validate.inventoryRules = () => {
    return [
      // classification is required
      body("classification_id")
        .notEmpty(),
      
      body("inv_make")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Please provide a vehicle make with at least 3 characters."), // on error this message is sent.
  
      // model is required and must be string
      body("inv_model")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Please provide a vehicle model with at least 3 characters."), // on error this message is sent.
  
      // valid year is required
      body("inv_year")
        .trim()
        .notEmpty()
        .isInt({ min: 1900, max: 2099 }).withMessage("Year must be between 1900 and 2099.")
        .toInt()
        .withMessage("Please provide a vehicle year."), // on error this message is sent.
  
      // description is required
      body("inv_description")
        .trim()
        .notEmpty()
        .isLength({ min: 10 }).withMessage("Please provide a description with at least 10 characters.")
        .withMessage("Please provide a vehicle description."), // on error this message is sent.

      // price is required and can be an integer or a float
        body("inv_price")
        .trim()
        .notEmpty()
        .isFloat({ min: 0 }).withMessage("Price must be a positive number.")
        .toFloat()
        .withMessage("Please provide a vehicle price."), // on error this message is sent.

      // miles is required and must be a positive integer
      body("inv_miles")
        .trim()
        .notEmpty()
        .isInt({ min: 0 }).withMessage("Miles must be a non-negative integer.")
        .toInt()
        .withMessage("Please provide vehicle mileage."), // on error this message is sent.

      // color is required and must be at least 3 characters
      body("inv_color")
        .trim()
        .notEmpty().withMessage("Please provide a color.")
        .isLength({ min: 3 }).withMessage("Please provide a color with at least 3 characters.")
        .withMessage("Please provide a vehicle color.") // on error this message is sent
    ]
  }

  /* ******************************
 * Check data and return errors or continue to add inventory
 * ***************************** */
validate.checkInvData = async (req, res, next) => {
  
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
   } = req.body

  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classification = await utilities.buildClassificationList()
    res.status(400).render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classification,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      errors,
    })
    return
  }
  next()
}

/* ******************************
 * Check data and return errors or continue to add classification
 * ***************************** */
validate.checkClassData = async (req, res, next) => {
  
    const { classification_name } = req.body

  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.status(400).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      classification_name,
      errors,
    })
    return
  }
  next()
}

module.exports = validate