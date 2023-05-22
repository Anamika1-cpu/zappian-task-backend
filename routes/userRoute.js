const express = require("express");

const {
  registerUser,
  loginUser,
  logout,
  getAllUsers,
  updateProfile,
  deleteUserProfile,
} = require("../controller/userController.js");
const { isAuthenticatedUser } = require("../middleware/auth.js");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/getAllUsers").get(getAllUsers);

router.route("/update/:id").put(updateProfile);

router.delete("/deleteuser/:id", deleteUserProfile);

router.route("/logout").get(logout);

module.exports = router;
