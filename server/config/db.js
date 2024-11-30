const mongoose = require("mongoose");
const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}`);
    //console.log(`\n MongoDB Connected !! DB Host: ${conn.connection.host} `);
  } catch (error) {
    //console.log("MongoDB Connection error", error);
    process.exit(1);
  }
};

module.exports = { connectToDb };
