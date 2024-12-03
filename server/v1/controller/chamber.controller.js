const { successResponse, errorResponse } = require("../../helper/responseHandler");
const { Chamber } = require("../../model/chamber.model");

// Createc
const createChamber = async (req, res) => {

    const { chamber, schedule } = req.body;

    // Validation
    if (!chamber || !schedule || !schedule.length) {
      return res
        .status(400)
        .json({ message: "Chamber and schedule are required." });
    }

    // Check for duplicate chamber
    const existingChamber = await Chamber.findOne({ chamber });
    if (existingChamber) {
      return errorResponse(res,{statusCode:404, message: "Chamber already exists." });
    }

    // Create new chamber
    const newChamber = new Chamber({ chamber, schedule });
    await newChamber.save();

    successResponse(res,{statusCode:201,
      message: "Chamber created successfully.",
      payload: {data: newChamber,}
    });
  }

// Update Chamber Schedule (Day/Time)
const updateChamberSchedule = async (req, res) => {
  const { id } = req.params; // Chamber name from the URL
//   const { chamber } = req.params; // Chamber name from the URL
  const { day, oldTime, newTime,chamber } = req.body;

  // Validation
  if (!day || !oldTime || !newTime) {
    return errorResponse(res,{statusCode:404, message: "Day, old time, and new time are required." });
  }

  // Find the chamber
  const chamberData = await Chamber.findById(id);

  if (!chamberData) {
    return errorResponse(res,{statusCode:404, message: "Chamber not found." });
  }

  // Find the day to update
  const daySchedule = chamberData.schedule.find((sch) => sch.day === day);

  if (!daySchedule) {
    return res.status(404).json({ message: `Schedule for ${day} not found.` });
  }

  // Ensure `time` is an array
  if (!Array.isArray(daySchedule.time)) {
    return res
      .status(500)
      .json({ message: `Time data for ${day} is not structured correctly.` });
  }

  // Update the specific time
  const timeIndex = daySchedule.time.indexOf(oldTime);
  if (timeIndex === -1) {
    return res
      .status(404)
      .json({ message: `Time ${oldTime} not found for ${day}.` });
  }

  // Check if the new time is the same as the old time
  if (oldTime === newTime) {
    return res.status(200).json({
      message: `Time for ${day} was already ${newTime}. No changes made.`,
      data: chamberData,
    });
  }

  daySchedule.time[timeIndex] = newTime;

  // Save the updated chamber data
  await chamberData.save();

  res.status(200).json({
    message: "Schedule updated successfully.",
    data: chamberData,
  });
};

// Delete Chamber
const deleteChamber = async (req, res) => {

    const { id } = req.params; 

  
    const deletedChamber = await Chamber.findByIdAndDelete(id);

    if (!deletedChamber) {
      return errorResponse(res,{statusCode:404, message: "Chamber not found." });
    }

    successResponse(res, {statusCode:200,
      message: "Chamber deleted successfully.",
      data: deletedChamber,
    });
  } 

const getChamber = async (req, res) => {
  const chamber = await Chamber.find();

  successResponse(res, {
    statusCode: 200,
    message: "Chamber found successfully",
    payload: {
      data: chamber,
    },
  });
};
module.exports = {
  createChamber,
  getChamber,
  updateChamberSchedule,
  deleteChamber,
};
