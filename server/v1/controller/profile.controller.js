const {
  successResponse,
  errorResponse,
} = require("../../helper/responseHandler");
const { Profile } = require("../../model/profile.model");
const fileLib = require("../../helper/staticFile");

const getProfile = async (req, res, next) => {
  const getProfileData = await Profile.find();
  successResponse(res, {
    statusCode: 200,
    message: "Profile  found successfully",
    payload: {
      getProfileData,
    },
  });
};
const getProfileById = async (req, res, next) => {
  const { id } = req.params; // Extract the ID from the request parameters

  // Find a single profile by its ID
  const profile = await Profile.findById(id);

  if (!profile) {
    return res.status(404).json({
      status: 404,
      message: "Profile not found",
    });
  }

  successResponse(res, {
    statusCode: 200,
    message: "Profile found successfully",
    payload: {
      profile,
    },
  });
};

const createProfile = async (req, res) => {
  const { name, designation, desc, service } = req.body;
  const urlPath = req.files?.url?.[0]?.filename || "";
  // Validation
  if (!name || !designation || !desc || !service || !service.length) {
    return errorResponse(res, {
      statusCode: 404,
      message: "All fields are required, including services.",
    });
  }

  // Create new profile
  const newProfile = new Profile({
    name,
    designation,
    desc,
    url: urlPath,
    services: service,
  });
  const saveProfile = await newProfile.save();

  successResponse(res, {
    message: "Profile created successfully.",
    payload: {
      saveProfile,
    },
  });
};
// Update Profile
const updateProfileById = async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };
  console.log(updates);

  const findProfile = await Profile.findById(id);

  if (!findProfile) {
    return errorResponse(res, {
      statusCode: 404,
      message: "Profile not found.",
    });
  }

  // Delete the existing file if a new file is uploaded
  if (req.files && req.files.url) {
    await fileLib.delete(findProfile.url);
  }

  if (req.files && req.files.url) {
    updates.url = req.files.url[0]?.filename || updates.url;
  }

  // Ensure `services` is properly updated
  if (req.body.services) {
    try {
      updates.services = JSON.parse(req.body.services); // Parse the JSON string safely
    } catch (error) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid services data format.",
      });
    }
  } else if (findProfile.services) {
    updates.services = [...findProfile.services, ...(req.body.services || [])];
  }

  const updatedProfile = await Profile.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true }
  );

  if (!updatedProfile) {
    return errorResponse(res, {
      statusCode: 404,
      message: "Failed to update profile.",
    });
  }

  successResponse(res, {
    statusCode: 201,
    message: "Profile updated successfully.",
    payload: {
      data: updatedProfile,
    },
  });
};

const deleteProfileById = async (req, res) => {
  const { id } = req.params;

  const deletedProfile = await Profile.findByIdAndDelete(id);

  if (!deletedProfile) {
    return errorResponse(res, {
      statusCode: 404,
      message: "Profile not found.",
    });
  }
  if (deletedProfile.url) {
    await fileLib.delete(deletedProfile.url);
  }
  successResponse(res, {
    statusCode: 200,
    message: "Profile deleted successfully.",
    payload: {
      data: deletedProfile,
    },
  });
};

module.exports = {
  getProfile,
  createProfile,
  deleteProfileById,
  updateProfileById,getProfileById
};
