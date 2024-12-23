const {
  successResponse,
  errorResponse,
} = require("../../helper/responseHandler");
const { Chamber } = require("../../model/chamber.model");

// Createc
// const createChamber = async (req, res) => {
//   const { chamber, address, schedule } = req.body;

//   // Validation
//   if (!chamber || !schedule || !schedule.length) {
//     return res.status(400).json({ message: "Chamber and schedule are required." });
//   }

//   // Validate for duplicate times within the same day in the schedule
//   for (const daySchedule of schedule) {
//     const timeSet = new Set(daySchedule.time);
//     if (timeSet.size !== daySchedule.time.length) {
//       return res.status(400).json({ message: `Duplicate times found on ${daySchedule.day}.` });
//     }
//   }

//   // // Check if the same day and time combination exists in any other chamber
//   for (const daySchedule of schedule) {
//     for (const time of daySchedule.time) {
//       const existingChamber = await Chamber.findOne({
//         "schedule.day": daySchedule.day,
//         "schedule.time": time,
//       });

//       if (existingChamber) {
//         return res.status(400).json({
//           message: `A chamber already exists with the same schedule for ${daySchedule.day} at ${time}.`,
//         });
//       }
//     }
//   }

//   // Check for duplicate chamber name
//   const existingChamber = await Chamber.findOne({ chamber });
//   if (existingChamber) {
//     return res.status(400).json({ message: "Chamber already exists." });
//   }

//   // Create new chamber
//   const newChamber = new Chamber({ chamber, address, schedule });
//   await newChamber.save();

//   // Respond with success
//   return res.status(201).json({
//     message: "Chamber created successfully.",
//     payload: { data: newChamber },
//   });
// };
const createChamber = async (req, res) => {
  const { chamber, address, schedule } = req.body;

  // Validation
  if (!chamber || !schedule || !schedule.length) {
    return res
      .status(400)
      .json({ message: "Chamber and schedule are required." });
  }
  const days = schedule.map(item => item.day);
  const duplicateDays = days.filter((day, index) => days.indexOf(day) !== index);
  if (duplicateDays.length > 0) {
    return res.status(400).json({
      message: `Duplicate schedule days found: ${duplicateDays.join(", ")}.`,
    });
  }
  // Check for duplicate chamber name
  const existingChamber = await Chamber.findOne({ chamber });
  if (existingChamber) {
    return errorResponse(res, {
      statusCode: 404,
      message: "Chamber already exists.",
    });
  }

  // Create new chamber
  const newChamber = new Chamber({ chamber, address, schedule });
  await newChamber.save();

  // Respond with success
  return successResponse(res, {
    statusCode: 201,
    message: "Chamber created successfully.",
    payload: { data: newChamber },
  });
};

// Update Chamber Schedule (Day/Time)
const updateChamberSchedule = async (req, res) => {
  const { id } = req.params; // Chamber name from the URL
  //   const { chamber } = req.params; // Chamber name from the URL
  // const { day, oldTime, newTime, chamber } = req.body;
  const updates = {...req.body}




  const chamberData = await Chamber.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true }
  );
  if (!chamberData) {
    return errorResponse(res, {
      statusCode: 404,
      message: "Chamber not found.",
    });
  }

  successResponse(res,{statusCode:201,
    message: "Schedule updated successfully.",
    data: chamberData,
  });
};

// Delete Chamber
const deleteChamber = async (req, res) => {
  const { id } = req.params;

  const deletedChamber = await Chamber.findByIdAndDelete(id);

  if (!deletedChamber) {
    return errorResponse(res, {
      statusCode: 404,
      message: "Chamber not found.",
    });
  }

  successResponse(res, {
    statusCode: 200,
    message: "Chamber deleted successfully.",
    data: deletedChamber,
  });
};

const getChamber = async (req, res) => {
  const chamber = await Chamber.find();

  successResponse(res, {
    statusCode: 200,
    message: "Chamber found successfully",
    payload: {
      chamber,
    },
  });
};
module.exports = {
  createChamber,
  getChamber,
  updateChamberSchedule,
  deleteChamber,
};
