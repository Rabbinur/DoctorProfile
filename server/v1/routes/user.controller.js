const crypto = require("crypto");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const {
  errorResponse,
  successResponse,
} = require("../../helper/responseHandler");

const sendResetEmail = require("../../helper/mailSent");
const { User } = require("../../model/user.model");
require('dotenv').config();

const registerUser = async (req, res, next) => {
  const { email, first_name,last_name,phone, password } = req.body;
  console.log({ email, first_name,last_name,phone, password });
 
  //check if user already exists
  let user = await User.findOne({ email });
  if (user) {
    return errorResponse(res, {
      message: `user already exists`,
      payload: { user },
    });
  }


  // Hash password and create verification token using JWT
  const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  //create a new user
  const newUser = new User({
    first_name,
    last_name,
    phone,
    email,
    password,
    verificationToken,
    isVerified: false,
  });
  const savedUser = await newUser.save();

  //console.log(savedUser);
  // Filter sensitive data before sending response
  const responseUser = { ...savedUser._doc };
  delete responseUser.password;
  //console.log(responseUser);

  //send verification email
  const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
  const subject = `Verify Your Email Address`;
  const body = `to verify your email Address`;
   await sendResetEmail(email, first_name, verificationLink, subject, body);
  successResponse(res, {
    statusCode: 200,
    message:
      "Registration Pending.  Please check your email to verify your account.",
    payload: { responseUser },
  });
};
//verify email
const verifyEmail = async (req, res, next) => {
  const { token } = req.query;
  //console.log(token);
  
  //only for jwt
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({
    email: decoded.email,
    verificationToken: token,
  });

  if (!user) {
    return errorResponse(res, {
      statusCode: 400,
      message: "Invalid or expired token",
    });
  }

  // Mark the user as verified and remove the verification token
  user.isVerified = true;
  user.isAuthenticated = true;
  user.verificationToken = undefined;

  await user.save();
  //console.log(`Email verified successfully`);
  successResponse(res, {
    statusCode: 200,
    message: "Email verified successfully.You can now log in",
  });
};
//login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Email and password are required",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Invalid credentials",
      });
    }

    // Check if the email is verified
    if (!user.isVerified) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Please verify your email before logging in",
      });
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        email: user.email,
        isAdmin: user.isAdmin,
        userId: user._id,
        role: user.role,
        first_name:user.first_name
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Set JWT as an HttpOnly cookie
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // Ensure secure flag is set in production
    //   sameSite: "strict", // Protect against CSRF
    //   maxAge: 2 * 60 * 60 * 1000, // 2 hours
    // });

    // Return success response
    successResponse(res, {
      statusCode: 200,
      message: "Login successful",
      payload: {
        token,
        first_name: user.first_name,
        email: user.email,
        phone: user.phone,
        last_name: user.last_name,
        isAdmin: user.isAdmin,
        userId: user._id,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return errorResponse(res, {
      statusCode: 500,
      message: "Login failed",
    });
  }
};

const getUser = async (req, res, next) => {
  const user = await User.find();

  successResponse(res, {
    statusCode: 200,
    message: `user found successfully`,
    payload: {
      user,
    },
  });
};

const requestPassReset = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return errorResponse(res, { statusCode: 404, message: `User not found` });
  }

  // Generate JWT token with expiration
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  // Hash the token and set it to the user's passwordResetToken field
  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes

  await user.save();

  // Send reset email
  const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
  const subject = `Password Reset Link`;
  const body = `Click the link to reset your password: ${resetLink}`;
  await sendResetEmail(email, user.first_name, resetLink, subject, body);

  successResponse(res, {
    statusCode: 200,
    message: "Check your email and click the link to reset your password",
  });
};

//change pass
const changePassword = async (req, res, next) => {
  const { token, password } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return errorResponse(res, {
      statusCode: 400,
      message: "Invalid or expired token",
    });
  }

  // Set new password
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  successResponse(res, {
    statusCode: 200,
    message: "Password reset successful",
  });
};

//?### update role ###
const updateUserRole = (async (req, res, next) => {
  const { _id, role } = req.params;
  console.log(_id);
  const roleUp = await User.findByIdAndUpdate(
    _id,
    { role: role },
    { new: true }
  );

  if (!roleUp) {
    return errorResponse(res, {
      statusCode: 400,
      message: "failed to update user role ",
    });
  }

  successResponse(res, {
    statusCode: 200,
    message: "Role updated  successfully",
  });
});
// update user
const updateUser = (async (req, res, next) => {
  const { _id } = req.params;
  const { address, phone } = req.body;

  // Find the user by ID
  const user = await User.findById(_id);
  if (!user) {
    return next(new NotFoundError("User Not Exist"));
  }

  // Update the user's details
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { address: address, phone: phone },
    { new: true }
  );

  if (!updatedUser) {
    return next(new NotFoundError("Update Failed"));
  }

  // Send a success status with no content
  appStatus(204, updatedUser, req, res, next);
});
module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  getUser,

  requestPassReset,
  changePassword,
  updateUserRole,
};
