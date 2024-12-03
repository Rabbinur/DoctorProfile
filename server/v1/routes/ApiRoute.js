const express = require("express");
const { BlogRouter } = require("./BlogRoute");
const ProfileRouter = require("./ProfileRoute");
const ChamberRouter = require("./ChamberRoute");
const AppointmentRoute = require("./AppointmentRoute");
const ReviewRouter = require("./ReveiwRoute");



const app = express.Router();

// Apply the authenticateToken middleware to protect routes
// app.use("/user",  UserRouter);
app.use("/blog",BlogRouter)
app.use("/profile",ProfileRouter)
app.use("/chamber",ChamberRouter)
app.use("/appointment",AppointmentRoute)
app.use("/review",ReviewRouter)

module.exports = app;
