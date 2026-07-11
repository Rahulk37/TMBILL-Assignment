const mongoose = require("mongoose");
const { env } = require("./env");

const connectDatabase = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database Connection Failed");
    process.exit(1);
  }
};

module.exports = {
  connectDatabase,
};export {};