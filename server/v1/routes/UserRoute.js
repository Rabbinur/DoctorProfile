const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const {
  registerUser,
  loginUser,
  verifyEmail,
  getUser,
  adminRoute,
  requestPassReset,
  changePassword,
  updateUserRole,
} = require("../controller/user.controller");
const {
  authenticateJWT,
  authorizeRoles,
} = require("../../helper/authenticateJWT");

const UserRouter = express.Router();

UserRouter.route("/all").get(asyncHandler(getUser));
UserRouter.route("/register").post(asyncHandler(registerUser));
UserRouter.route("/login").post(asyncHandler(loginUser));
UserRouter.route("/verify-email").post(asyncHandler(verifyEmail));
UserRouter.route("/request-password-reset").post(
  asyncHandler(requestPassReset)
);
UserRouter.route("/changePass").post(asyncHandler(changePassword));
UserRouter.route("/update-role/:_id/:role").patch(asyncHandler(updateUserRole));



module.exports = UserRouter;
