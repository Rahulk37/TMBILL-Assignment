const http = require("http");

const app = require("./app");
const { env } = require("./config/env");
const { connectDatabase } = require("./config/database");
const { initializeSocket } = require("./config/socket");

const startServer = async () => {
  try {
    await connectDatabase();

    const server = http.createServer(app);

    initializeSocket(server);

    server.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();