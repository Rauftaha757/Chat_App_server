// step to gain login success
// find user if exsists?
// if exsists? ------------> compare passsword
const ApiErrors = require("../../utils/ApiErrors");
const UserModel = require("../models/user.model");
const ApiResponse = require("../../utils/ApiResponse.js");

const loginuser = async (req, res) => {
  const { email, username, password } = req.body;
  // email=email.toLowercase();
  const userexsits = await UserModel.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (!userexsits) {
    throw new ApiErrors(400, "You don't have an account, kindly make one");
  } else {
    const checkpassword = await userexsits.isPasswordCorrect(password);

    if (!checkpassword) {
      throw new ApiErrors(400, "Your credentials are invalid");
    } else {
      const refreshtoken = userexsits.generateRefreshToken();
      //   const accesstoken = userexsits.generateAccessToken();
      await userexsits.updateOne({
        refershtoken: refreshtoken,
      });
      await userexsits.save({ validateBeforeSave: false });
      return res.status(200).json(
        new ApiResponse(200, "User logged in successfully", {
          email: userexsits.email,
          username: userexsits.username,
          refreshtoken: refreshtoken,
        })
      );
    }
  }
};

module.exports = loginuser;
