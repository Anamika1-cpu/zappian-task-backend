const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017", {
      dbname: "task",
    })
    .then(() => {
      console.log("Database connection established");
    })
    .catch((err) => console.log(err));
};

module.exports = connectDatabase;
