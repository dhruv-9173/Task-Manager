const mongoose = require("mongoose");

async function connectdb(url) {
  mongoose
    .connect(url)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("Couldn't Connect to Database: ", err));
}

module.exports = connectdb;
