const express = require("express");
const router = express.Router();
const Menu = require("../models/menu");
const Product = require("../models/products");

router.get("/", function(req, res) {
  Menu.find({}, "title link", (err, menu) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send({ menu: menu });
    }
  });
});

router.get("/:category", function(req, res) {
  Menu.findOne({ link: req.params.category }, (err, category) => {
    if (err) res.sendStatus(500);
    Product.find({ category: category.link }, (err, products) => {
      if (err) res.sendStatus(500);
      res.send({ products: products });
    });
  });
});

module.exports = router;
