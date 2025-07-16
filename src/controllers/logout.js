// logout by found user
// and set userrefershtokenby undefined

const ApiErrors = require("../../utils/ApiErrors");
const ApiResponse = require("../../utils/ApiResponse");
const UserModel = require("../models/user.model");

const logoutuser = async (req, res) => {
  const check = await UserModel.findByIdAndUpdate(
    req.user._id,
    { $set: { refershtoken: "" } },
    { new: true }
  );
  if (!check) {
    throw new ApiErrors(400, "Not Logged out");
  } else {
    return res
      .status(200)
      .json(new ApiResponse(201, "User logged out successfully"));
  }
};

module.exports = logoutuser;
