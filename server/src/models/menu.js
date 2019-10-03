const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  title: String,
  link: String
});

module.exports = mongoose.model("Menu", MenuSchema);
