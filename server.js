import path from "path";
import cors from "cors";
import express, { json } from "express";

import morgan from "morgan";
import errorMiddleware from "./middleware/errorMiddleware.js";

import notificationRoutes from "./routes/notificationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import helperRoutes from "./routes/helperRoutes.js";
import servicesRoutes from "./routes/servicesRoutes.js";
import apiRoutes from "./routes/api.js";

/*const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
const smsKey = process.env.SMS_SECRET_KEY;*/

import dotenv from "dotenv";

const PORT = process.env.PORT || 5000;

dotenv.config();

//PAYMENT STATUS
global.TRIAL = 1;
global.PAID = 2;
global.TRIAL_EXPIRED = 3;
global.LICENSEEXPIRE = 4;

//URLS
/*global.frontendURL='https://dry-dusk-06044.herokuapp.com/';
global.backendURL ='https://dry-dusk-06044.herokuapp.com/';*/

global.frontendURL = "http://localhost:" + PORT;
global.backendURL = "http://localhost:" + PORT;

const app = express();

// const Sentry = require("@sentry/node");
// or use es6 import statements
import * as Sentry from "@sentry/node";

// const Tracing = require("@sentry/tracing");
// or use es6 import statements
import * as Tracing from "@sentry/tracing";

Sentry.init({
  dsn: "https://876c2d7f825e4d398416a6f50090d419@o1004679.ingest.sentry.io/5965708",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/helpers", helperRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("", apiRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => {
  res.send("Welocme to localdekho. API is running on heroku....");
});

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
process.on("uncaughtException", function (err) {
  console.log("Caught exception: " + err);
});
