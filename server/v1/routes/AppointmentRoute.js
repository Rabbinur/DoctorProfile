const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const { getAllAppointments, createAppointment, updateAppointmentStatus, deleteAppointment } = require("../controller/appointment.controller");


const AppointmentRoute = express.Router();

AppointmentRoute.route("/all").get(asyncHandler(getAllAppointments))
AppointmentRoute.route("/create").post(asyncHandler(createAppointment))
AppointmentRoute.route("/:id").patch(asyncHandler(updateAppointmentStatus))
AppointmentRoute.route("/:id").delete(asyncHandler(deleteAppointment))


module.exports = AppointmentRoute;