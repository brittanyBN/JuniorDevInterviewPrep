const express = require("express");
const router = express.Router();
const db = require("../models");
const crypto = require("crypto");
const UserService = require("../services/UserService");
const userService = new UserService(db);
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");
const authentication = require("../middleware/authentication");
const forgotPassword = require("../utils/forgotPassword");
const resetPassword = require("../utils/resetPassword");
const signUpUser = require("../utils/signUpUser");
const { requiresAuth } = require("express-openid-connect");

router.get("/hello", (req, res) => {
  let { token_type, access_token } = req.oidc.accessToken;
  const userInfo = req.oidc.fetchUserInfo();
  res.send(userInfo);
  console.log("user info", userInfo);
});

router.get("/profile/:id", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// router.post("/signup/admin", async (req, res, next) => {
//   await signUpUser(req, res, next, "admin");
// });
//
// router.post("/signup/member", async (req, res, next) => {
//   await signUpUser(req, res, next, "member");
// });
//
// router.post("/login", jsonParser, async (req, res, next) => {
//   const { email, password } = req.body;
//   if (email === null || typeof email !== "string") {
//     return res.status(400).json({ message: "Email is required." });
//   }
//   if (password === null || typeof password !== "string") {
//     return res.status(400).json({ message: "Password is required." });
//   }
//   userService.getOne(email).then((data) => {
//     if (data === null) {
//       return res.status(400).json({ message: "Incorrect email or password" });
//     }
//     crypto.pbkdf2(
//       password,
//       data.salt,
//       310000,
//       32,
//       "sha256",
//       function (err, hashedPassword) {
//         if (err) {
//           return cb(err);
//         }
//         if (!crypto.timingSafeEqual(data.encryptedPassword, hashedPassword)) {
//           return res
//             .status(400)
//             .json({ message: "Incorrect email or password" });
//         }
//         let token;
//         try {
//           token = jwt.sign(
//             { id: data.id, email: data.email, role: data.role },
//             process.env.TOKEN_SECRET,
//             { expiresIn: "1 hr" }
//           );
//           return res.status(200).json({
//             message: "Successfully logged in",
//             id: data.id,
//             email: data.email,
//             role: data.role,
//             token: token,
//           });
//         } catch (err) {
//           return res
//             .status(500)
//             .json({ message: "Something went wrong with creating JWT token" });
//         }
//       }
//     );
//   });
// });
//
// router.post("/forgotPassword", forgotPassword);
//
// router.get("/resetPassword/:resetToken", async (req, res, next) => {
//   try {
//     const resetToken = req.params.resetToken;
//     console.log(resetToken);
//     res.status(200).json({
//       message: "Successfully used reset link",
//       data: resetToken,
//     });
//   } catch (err) {
//     next(err);
//   }
// });
//
// router.put("/resetPassword/:resetToken", resetPassword);
//
// router.post("/logout", authentication, async (req, res, next) => {
//   const { email } = req.body;
//   if (email === null) {
//     return res.status(400).json({ message: "Email is required." });
//   }
//   const user = await userService.getOne(email);
//   if (user === null) {
//     return res.status(400).json({ message: "Provided email is not in use." });
//   }
//   res.status(200).json({ message: "Successfully logged out" });
// });

router.delete("/:id", authentication, async (req, res, next) => {
  try {
    const user = await userService.delete(req.params.id);
    if (user === null) {
      return res.status(400).json({ message: "User does not exist." });
    }
    res.status(200).json({
      message: "Successfully deleted user",
      data: user,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
