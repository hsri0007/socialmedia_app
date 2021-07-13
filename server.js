const express = require("express");
const app = express();
const server = require("http").Server(app);
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const connectDB = require("./utilsserver/mongoserver");
require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 3000;
connectDB();

nextApp.prepare().then(() => {
  app.use(express.json());
  app.use("/api/signup/", require("./pages/api/signup"));
  app.use("/api/auth/", require("./pages/api/auth"));
  app.all("*", (req, res) => handle(req, res));

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log("running express server");
  });
});
