const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const app = require("../server");

chai.use(chaiHttp);

describe("Conketa", () => {
  let headers = {
    accept: "application/vnd.conekta-v2.1.0+json",
    "Accept-Language": "es",
    "content-type": "application/json",
  };

  describe("post /conekta/customer/create", () => {
    it("Deberia crear un cliente en Conekta", (done) => {
      let data = {
        name: "Abraham Macejkovic",
        email: "Gina_Jacobi24@yahoo.com",
        phone: "7398508781",
      };

      chai
        .request(app)
        .post("/conekta/customer/create")
        .set("Authorization", process.env.CONEKTA_PRIVATE_KEY)
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("post /conekta/customer/create_payment_method", () => {
    let customer_id;
    before((done) => {
      let customerData = {
        name: "Jaleel Stanton",
        email: "Jovani_Abernathy7@hotmail.com",
        phone: "8597516808",
      };

      chai
        .request(app)
        .post("/conekta/customer/create")
        .set("Authorization", process.env.CONEKTA_PRIVATE_KEY)
        .send(customerData)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          customer_id = res.body.id;
          done();
        });
    });

    it("Deberia crear un metodo de pago en Conekta", (done) => {
      let data = {
        type: "card",
        token_id: "tok_test_visa_4242",
        customer_id: customer_id,
      };

      chai
        .request(app)
        .post("/conekta/customer/create_payment_method")
        .set("Authorization", process.env.CONEKTA_PRIVATE_KEY)
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("post /conekta/customer/create_unique_payment_link", () => {
    let customer_id;
    before((done) => {
      let customerData = {
        name: "Keith Krajcik",
        email: "Gregorio.Streich@gmail.com",
        phone: "5376094853",
      };

      chai
        .request(app)
        .post("/conekta/customer/create")
        .set("Authorization", process.env.CONEKTA_PRIVATE_KEY)
        .send(customerData)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          customer_id = res.body.id;
          done();
        });
    });

    it("Debería crear un link de pago único en Conekta", (done) => {
      let data = {
        order_template: {
          customer_info: {
            customer_id: customer_id,
          },
          currency: "MXN",
          line_items: [
            {
              name: "Gorgeous Granite Bike",
              quantity: 3,
              unit_price: 4580,
            },
          ],
        },
        recurrent: false,
        type: "PaymentLink",
        expires_at: 1700761699,
        name: "Payment Link Name 1594138857",
        needs_shipping_contact: false,
        payments_limit_count: 5,
      };

      chai
        .request(app)
        .post("/conekta/customer/create_unique_payment_link")
        .set("Authorization", process.env.CONEKTA_PRIVATE_KEY)
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("url");
          done();
        });
    });
  });
});
