const express = require("express");
const router = express.Router();
const Product = require("../models/products");

router.get("/offers", function(req, res) {
  Product.find({ isOffer: true }, (err, products) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send({ products: products });
    }
  });
});

module.exports = router;
