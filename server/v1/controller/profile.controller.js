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
      data: getProfileData,
    },
  });
};

const createProfile = async (req, res) => {
  const { name, designation, desc, service } = req.body;
  const urlPath = req.files?.url?.[0]?.path || "";
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
  const findProfile = await Profile.findById(id);

  if (!findProfile) {
    return errorResponse(res, {
      statusCode: 404,
      message: "Profile not found.",
    });
  }

  // Delete the existing file if a new file is uploaded
  if (findProfile.url) {
    await fileLib.delete(findProfile.url);
  }

  if (req.files && req.files.url) {
    updates.url = req.files.url[0]?.path || updates.url;
  }

  // Ensure `services` is properly updated
  if (Array.isArray(req.body.services)) {
    updates.services = req.body.services; // Directly set `services` to the new array from the request
  } else if (findProfile.services) {
    updates.services = [...findProfile.services, ...(req.body.services || [])]; // Merge existing and new if needed
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
  updateProfileById,
};
