const express = require("express");
const { BlogRouter } = require("./BlogRoute");



const app = express.Router();

// Apply the authenticateToken middleware to protect routes
// app.use("/user",  UserRouter);
app.use("/blog",BlogRouter)

module.exports = app;
