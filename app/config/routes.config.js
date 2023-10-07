module.exports = function (app) {
  const fs = require("fs")
  let files = []
  if (fs.existsSync("./spec/requests"))
    files = fs.readdirSync("./spec/requests")
  

  app.get("/", (req, res) => {
    res.json("Bonanza welcome")
  })

  require("../routes/conekta.routes")(app)
}
