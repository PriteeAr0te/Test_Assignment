const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGO_URL;

const connectToMongo = async () => {
  try {
    const client = await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB Successfully");
  } catch (error) {
    console.log("Error Occurred during Connecting to database");

    setTimeout(() => {
      connectToMongo();
    }, 60000);
  }
};

module.exports = connectToMongo;
