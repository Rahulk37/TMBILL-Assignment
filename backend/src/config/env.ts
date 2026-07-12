import dotenv = require("dotenv");

dotenv.config();

const env = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || "",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
};

module.exports = { env };
