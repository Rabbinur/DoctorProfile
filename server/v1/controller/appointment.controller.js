const sendResetEmail = require("../../helper/mailSent");
const {
  successResponse,
  errorResponse,
} = require("../../helper/responseHandler");

const { Appointment } = require("../../model/appointment.model");

// Create Appointment
const createAppointment = async (req, res) => {
  const newAppointment = new Appointment({
    ...req.body,
  });

  await newAppointment.save();
  successResponse(res, {
    statusCode: 201,
    message: "Appointment created successfully!",
    payload: {
      data: newAppointment,
    },
  });
};

// Get All Appointments
const getAllAppointments = async (req, res) => {
  const appointments = await Appointment.find();
  successResponse(res, {
    statusCode: 200,
    message: "Appointments found successfully",
    payload: { data: appointments },
  });
};

// Update Appointment Status (Approve/Reject)
const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Find the appointment by ID
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found." });
  }

  // Update the appointment status
  appointment.status = status;
  await appointment.save();

  // Send email if email is available
  // Send email if email is available
  if (appointment.email) {
    const emailData = {
      email: appointment.email,
      first_name: appointment.name,
      verificationLink: null,
      shcedule: `${appointment.day} - ${appointment.date.toDateString()} at -${
        appointment.time
      }`,
      subject: `${
        status === "Approved"
          ? "Your Appointment is Approved"
          : "Your Appointment is Rejected try another day"
      }`,
      chamberName: appointment.chamber,
      body: `${
        status === "Approved"
          ? `${
              appointment.day
            },\n\nYour appointment for ${appointment.date.toDateString()} at ${
              appointment.time
            } has been approved.\n\nThank you,`
          : `Sorry, your appointment has been cancelled due to doctor unavailability.`
      }`,
    };

    // Call the email service
    await sendResetEmail(emailData);
  }

  // Send response back to the client
  successResponse(res, {
    statusCode: 200,
    message: `Appointment ${status.toLowerCase()} mail successfully sent!`,
    appointment,
  });
};

// Delete Appointment
const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  const appointment = await Appointment.findByIdAndDelete(id);
  if (!appointment) {
    return errorResponse(res, {
      statusCode: 404,
      message: "Appointment not found",
    });
  }

  successResponse(res, {
    statusCode: 200,
    message: "Appointment deleted successfully!",
  });
};

module.exports = {
  getAllAppointments,
  createAppointment,
  deleteAppointment,
  updateAppointmentStatus,
};
