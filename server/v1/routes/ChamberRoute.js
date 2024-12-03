const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const { createChamber, updateChamberSchedule, deleteChamber, getChamber } = require("../controller/chamber.controller");
const ChamberRouter = express.Router();

ChamberRouter.route("/all").get(asyncHandler(getChamber))
ChamberRouter.route("/create").post(asyncHandler(createChamber))
ChamberRouter.route("/:id").patch(asyncHandler(updateChamberSchedule))
ChamberRouter.route("/:id").delete(asyncHandler(deleteChamber))


module.exports=ChamberRouter