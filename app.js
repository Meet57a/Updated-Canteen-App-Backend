const express = require("express");
const body_parser = require("body-parser");
const AuthRouter = require("./router/auth");
const ProductRouter = require("./router/product_routes");
const CartRouter = require("./router/cart_routes");

const jwt = require("jsonwebtoken");

const app = express();
app.use(
  body_parser.json({
    limit: "50mb",
  })
);



app.use("/", AuthRouter);
app.use("/",ProductRouter);
app.use("/",CartRouter);

module.exports = app;
