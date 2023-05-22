const express = require("express");
const cors = require("cors");

const app = express();
// app.use(cors());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

//route imports
const userRoute = require("./routes/userRoute.js");
app.use("/api/v1", userRoute);

module.exports = app;
