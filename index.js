const express = require("express");
const session = require("client-sessions");
const mongoose = require("mongoose");
const config = require("./config/config.json");
require("dotenv").config();
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 4000;
const DB_URL = process.env.MONGODB_URI;
const SYS_NAME = "ScanStock";


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
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(
      new Error(`CORS blocked for origin: ${origin}`)
    );
  },
  credentials: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  session({
    cookieName: "session",
    secret: process.env.SESSION_KEY,
    duration:
      Number(process.env.SESSION_TIMEOUT_MIN || 20) *
      60 *
      1000,
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

app.use("/barcodes", express.static("barcodes"));
/*=======================Routes========================*/
const users = require('./routes/UsersRouter');
const userGroup = require('./routes/UserGroupsRouter')
const account = require('./routes/AccountRouter')
const category = require('./routes/CategoryRouter')
const location = require('./routes/LocationRouter')
const product = require('./routes/ProductRouter')
const supplier = require('./routes/SupplierRouter')
const customer = require('./routes/CustomerRouter')
const Receipt = require('./routes/ReceiptRouter')
const ReceiptLine = require('./routes/ReceiptLineRouter')
const OutboundLine = require('./routes/OutboundLineRouter')
const Outbound = require('./routes/OutboundRouter')
const Report = require('./routes/ReportRouter')

app.use('/api/users', users);
app.use('/api/roles', userGroup);
app.use('/api/account', account);
app.use('/api/category', category);
app.use('/api/location', location);
app.use('/api/product', product)
app.use('/api/supplier', supplier)
app.use('/api/customer', customer)
app.use('/api/receipt', Receipt)
app.use('/api/receiptline', ReceiptLine)
app.use('/api/outbound', Outbound)
app.use('/api/outboundline', OutboundLine)
app.use('/api/report', Report)



startServer();