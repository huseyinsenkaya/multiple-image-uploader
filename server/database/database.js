const mongoose = require("mongoose");
const config = require("../../config");

const Connect = async () => {
  try {
    // mongodb connection
    const con = await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected ${con.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = Connect;
