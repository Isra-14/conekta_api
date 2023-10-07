const db = require("../models")
const axios = require("axios")

require("dotenv").config()

const Serializer = require("../serializers/serializer").Serializer

let options = {
  headers: {
    accept: "application/vnd.conekta-v2.1.0+json",
    "Accept-Language": "es",
    "content-type": "application/json",
    authorization: process.env.CONEKTA_PRIVATE_KEY,
  },
}

module.exports.create_customer = async (req, res) => {
  try {
    let data = {
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
    }

    options["data"] = data
    options["url"] = "https://api.conekta.io/customers"
    options["method"] = "POST"

    const response = await axios.request(options)
    res.status(200).send(response.data)
  } catch (error) {
    error.status = error.status || 500
    res.status(error.status).send({ message: error.message })
  }
};

module.exports.create_payment_method = async (req, res) => {
  try {
    let data = {
      type: req.body.type,
      token_id: req.body.token_id,
    }

    options["data"] = data;
    options["method"] = "POST";
    options[
      "url"
    ] = `https://api.conekta.io/customers/${req.body.customer_id}/payment_sources`

    const response = await axios.request(options)
    res.status(200).send(response.data)
  } catch (error) {
    error.status = error.status || 500
    res.status(error.status).send({ message: error.message })
  }
}

module.exports.create_unique_payment_link = async (req, res) => {
  try {
    let data = {
      expires_at: req.body.expires_at,
      name: req.body.name,
      allowed_payment_methods: ["cash", "card", "bank_transfer"],
      order_template: req.body.order_template,
      recurrent: req.body.recurrent,
      type: req.body.type,
      payments_limit_count: req.body.payments_limit_count,
      needs_shipping_contact: req.body.needs_shipping_contact,
    }

    options["data"] = data
    options["method"] = "POST"
    options["url"] = "https://api.conekta.io/checkouts"

    const response = await axios.request(options)
    res.status(200).send(response.data)
  } catch (error) {
    error.status = error.status || 500
    res.status(error.status).send({ message: error })
  }
}
