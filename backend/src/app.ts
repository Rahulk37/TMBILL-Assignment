const express = require("express");
const cors = require("cors");

const { env } = require("./config/env");
const routes = require("./routes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
  })
);

app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

module.exports = app;

// Make this file a TypeScript module
export {};