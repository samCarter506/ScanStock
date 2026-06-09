const express = require("express");
const session = require("client-sessions");
const mongoose = require("mongoose");
const config = require("./config/config.json");

const app = express();

const PORT = config.Port;
const DB_URL = config.mongoDB.url;
const SYS_NAME = "ScanStock";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    cookieName: "session",
    secret: "ScanStock with you phone (scanner @@ )",
    duration: config.SessionTimeoutMin * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true,
    secure: false,
    ephemeral: true,
  })
);

async function startServer() {
  try {
    await mongoose.connect(DB_URL);

    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(
        `${SYS_NAME} Server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
}

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB Error:", err);
});

startServer();