const express = require("express");
const RegisterUser = require("../src/controllers/register.user");
const authrouter = express.Router();
const upload = require("../src/middleware/multer.js");
const loginuser = require("../src/controllers/login.user.js");
const UpdateAvatar = require("../src/controllers/update.avatar.js");
const verifyToken = require("../src/middleware/verifyjwt.js");
const changepassword = require("../src/controllers/change.password.js");
const logoutuser = require("../src/controllers/logout.js");
const GetLoggedInUser = require("../src/controllers/getLoggedinuser.js");


// register route
authrouter.route("/registeruser").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  RegisterUser
);

//login routes
authrouter.route("/loginuser").post(loginuser);


//secured routes
authrouter.route("/updateavatar").post(verifyToken, upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),UpdateAvatar);
  authrouter.route("/changepassword").post(verifyToken,changepassword)
  authrouter.route("/logoutuser").post(verifyToken,logoutuser)
  authrouter.route("/getloggedinuser").post(verifyToken,GetLoggedInUser)
module.exports = authrouter;
