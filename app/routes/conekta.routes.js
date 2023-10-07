const controller = require("../controllers/conekta.controller")

module.exports = function (app) {
  app.post("/conekta/customer/create", controller.create_customer)
  app.post(
    "/conekta/customer/create_payment_method",
    controller.create_payment_method
  )
  app.post(
    "/conekta/customer/create_unique_payment_link",
    controller.create_unique_payment_link
  )
}
