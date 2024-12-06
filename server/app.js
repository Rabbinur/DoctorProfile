const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const { limiter } = require("./middleware/rateLimiter");
const apiRoute = require("./v1/routes/ApiRoute");
const dotenv = require("dotenv");
const { errorResponse } = require("./helper/responseHandler");
var morgan = require('morgan')
dotenv.config(); // Load environment variables

const allowedDomains = [
  `${process.env.CLIENT_URL}`,
  `${process.env.SERVER_URL}`,
  `${process.env.ADMIN_URL}`,
  "http://localhost:5173",
  "http://localhost:9000",
  "http://localhost:5174",
];



// App initialization
const app = express();

// CORS setup
app.use(
  cors({
    origin: allowedDomains,
    credentials: true,
  })
);
// Apply rate limiter to all API routes
app.use("/api/", limiter);
app.use(morgan('dev'))

app.use(helmet());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));

app.use("/uploads", express.static("uploads"));
// Referrer-based access control (optional, if needed)
app.use("/api", (req, res, next) => {
  const origin = req.get("origin"); // Use Origin header if Referer is not available
  console.log("Origin:", origin); // Log Origin header

  const referer = req.get("referer");
  console.log("Referer:", referer); // Log Referer header

  // If neither referer nor origin is valid, block the request
  if (
    (!referer || !allowedDomains.some(domain => referer.startsWith(domain))) &&
    (!origin || !allowedDomains.some(domain => origin.startsWith(domain)))
  ) {
    return res.status(403).json({ message: "Forbidden: Invalid Access" });
  }

  next();
});




// Set EJS as the view engine
app.set("view engine", "ejs");

// Define routes
app.get("/", (req, res) => {
  const currentYear = new Date().getFullYear();
  res.render("index", { title: "Doctor Profile", year: currentYear });
});

// Define API Routes
const api = process.env.BASE_URL_V1;
console.log("API Base URL:", api); // Debugging log for base URL
app.use(api, apiRoute);

// Handle undefined routes
app.use(api, (req, res) => {
  const method = req.method;
  return res.send(
    `API not found.
    Method: ${method},
    Host: ${process.env.SERVER_URL},
    Base: ${api},
    Endpoint: ${req.path}`
  );
});

// Error handling middleware
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status || 500,
    message: err.message,
  });
});

// Export the Express app
module.exports = app;
