const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

const personRouter = require("./routes/personRoutes");

// EXPRESS CONFIGURATIONS
const app = express();

// CORS
const corsOptions = {
  origin: "http://localhost:8000",
  credentials: true,
  // optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//SETTING SECURITY HEADERS
// app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: {
      allowOrigins: ["*"],
    },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["*"],
        scriptSrc: ["* data: 'unsafe-eval' 'unsafe-inline' blob:"],
      },
    },
  })
);

dotenv.config({ path: "./config.env" });

// SETTING RATE LIMITING FOR IP
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many request from this IP, please try again later",
});
app.use(limiter);

// BODY PARSER, Reader data from body into req.body
app.use(express.json({ limit: "10kb" }));

// DATA SANITIZATION AGAINST NOSQL QUERY INJECTION
app.use(mongoSanitize());

// DATA SANITIZATION AGAINST XSS
app.use(xss());

//ROUTING
app.use("/api", personRouter);

app.all("*", (req, res) => {
  res.status(500).send("Error creating person");
});

module.exports = app;
