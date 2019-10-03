const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const config = require("./config");

const menuRouter = require("./routes/menu");
const productsRouter = require("./routes/products");

mongoose.Promise = global.Promise;
mongoose.connect(config.dbURL);
mongoose.connection
  .once("open", () => {
    console.log(`Mongoose - successful connection ...`);
  })
  .on("error", error => console.warn(error));

const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// routes
app.use("/menu", menuRouter);
app.use("/products", productsRouter);

app.listen(process.env.PORT || config.port, () =>
  console.log(`Server start on port ${config.port} ...`)
);
