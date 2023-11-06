require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fs = require("fs");
const cert = fs.readFileSync("keys/certificate.pem");
const options = { server: { sslCA: cert } };
const cors = require("cors");
const hsts = require("./middleware/hsts");
const helmet = require('helmet');
const morgan = require('morgan');

//connect to mongo db
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected");
  })
  .catch((e) => {
    console.log(e.message);
    console.log("Not Connected");
  }, options);

//Middleware
app.use(cors({ origin: "http://localhost:4200", optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(hsts);
app.use(helmet());
app.use(morgan('combined'));

//Access control using headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

//Defaut
app.get("/", (req, res) => {
  res.send("default output");
});

// Routes
app.use("/api/login", require("./routes/login_route"));
app.use("/api/signup", require("./routes/signup_route"));
app.use("/api/posts", require("./routes/post_route"));

module.exports = app;
