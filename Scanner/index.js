const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 6000;
const DB_URL = process.env.MONGODB_URI;
const SYS_NAME = "ScanStock Scanner";


if (!process.env.SESSION_KEY) {
  throw new Error("SESSION_KEY is missing from .env");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing from .env");
}

if (!DB_URL) {
  throw new Error("MONGODB_URI is missing from .env");
}

const allowedOrigins = [
    "http://localhost:3000",
    "https://scanstock-portal.onrender.com"
];

app.use(cors({
    origin(origin, callback) {

        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        callback(new Error("Not allowed by CORS"));
    }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startServer() {
  try {
    await mongoose.connect(DB_URL);

    console.log("MongoDB Connected");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(
        `${SYS_NAME} Server running on port ${PORT}`
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
