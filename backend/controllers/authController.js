const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const pwEncrypt = require("../helpers/pwEncryption");
const { generateToken } = require("../helpers/token");
const { sendEmail } = require("../helpers/sendEmail");

module.exports = {
  register: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json({
        success: true,
        user,
        message: "User created successfully",
        token: jwt.sign(user.toJSON(), process.env.ACCESS_KEY, {
          expiresIn: "120min",
        }),
      });
    } catch (err) {
      console.log("error during registration", err);
    }
  },

  login: async (req, res) => {
    const { email, password, rememberMe } = req.body;
    if (email && password) {
      const user = await User.findOne({ email }).select("+password");

      // If user is registered with Google, prevent password login
      if (user && user.provider === "firebase") {
          res.errorStatusCode = 401;
          throw new Error("Please sign in with Google !")
      }

      if (user && user.password == pwEncrypt(password)) {
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, {
          expiresIn: "120m"});

        if (rememberMe) {
          const refreshToken = jwt.sign(
            { _id: user._id, password: user.password },
            process.env.REFRESH_KEY,
            { expiresIn: "7d" }
          );

          // Fixing setting cookies
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV,
            sameSite: "strict",
            path: "/",  // Added path
            maxAge: 7 * 24 * 60 * 60 * 1000
          });
        }

        res.send({
          error: false,
          user: await User.findOne({ email }),
          token: accessToken
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong email or password!");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Invalid login credentials!");
    }
  },

  logout: async (req, res) => {
    // Fixing clearing cookies
    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      sameSite: "strict",
      path: "/",  // Added path
      maxAge: 0
    });

    res.send({
      error: false,
      message: "Logged out successfully!",
    });
  },

  refresh: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      jwt.verify(refreshToken, process.env.REFRESH_KEY, async (err, data) => {
        if (err) {
          res.errorStatusCode = 401;
          throw new Error("Invalid refresh token!");
        } else {
          const { _id, password } = data;

          if (_id && password) {
            const user = await User.findOne({ _id }).select("+password");
            if (user && user.password == password) {
              const accessToken = jwt.sign(
                user.toJSON(),
                process.env.ACCESS_KEY,
                { expiresIn: "120min" }
              );
              res.send({
                error: false,
                bearer: {
                  access: accessToken,
                },
              });
            } else {
              res.errorStatusCode = 401;
              throw new Error("User not found - BAD TOKEN!");
            }
          } else {
            res.errorStatusCode = 401;
            throw new Error("Invalid token data!");
          }
        }
      });
    } else {
      res.errorStatusCode = 401;
      throw new Error("No refresh token provided!");
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      let user;

      try {
        // Find user by email
        user = await User.findOne({ email });

        // If the user can't be found
        if (!user) {
          return res.status(200).json({
            message: "An account with that email could not be found",
          });
        }
      } catch (error) {
        console.error("Find user by email error:", error);
        return res.status(500).json({
          message: "Error finding user",
        });
      }

      // Generate reset token
      const resetToken = generateToken();

      try {
        user.reset_password_token = resetToken;
        user.reset_password_expires = new Date(Date.now() + 3600000); // 1 hour from now
        await user.save();
      } catch (error) {
        console.error("Update reset token:", error);
        return res.status(500).json({
          message: "Error updating reset token",
        });
      }

      // Create the reset URL
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

      // Email content
      const message = `
        Hi ${user.first_name},

        You recently requested to rest your password. Please click the link below to proceed:

        <a href="${resetUrl}">${resetUrl}</a>

        This password reset link is only valid for the next 60 minutes.
        
        If you did not request a password reset, please ignore this email :)

        Sincerely,
        Your <i>Toddlers on the Road</i> team
      `;

      try {
        // Send email
        await sendEmail({
          email: user.email,
          subject: "Request to reset you password",
          message,
        });
      } catch (error) {
        console.error("Sending email error:", error);
        return res.status(500).json({
          message: "Error sending email",
        });
      }

      res.status(200).json({
        message:
          "If an account exists with this email, you will receive password reset instructions.",
      });
    } catch (error) {
      console.error("Password reset error:", error);
      res
        .status(500)
        .json({ message: "Error processing password reset request" });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { resetToken } = req.params;
      const { new_password } = req.body;
      let user;

      try {
        // Find user with valid reset token
        user = await User.findOne({
          reset_password_token: resetToken,
        });
      } catch (error) {
        console.error("Find user with valid reset token:", error);
        return res.status(500).json({
          message: "Error finding user",
        });
      }

      const currentTime = Date.now();
      const expiryTime = user.reset_password_expires.getTime();

      // Check if user exists and token hasn't expired
      if (!user || expiryTime < currentTime) {
        return res.status(400).json({
          message: "Password reset token is invalid or has expired",
        });
      }

      user.password = new_password;
      user.reset_password_token = null;
      user.reset_password_expires = null;

      try {
        // Update password and clear reset token fields
        await user.save();
      } catch (error) {
        console.error("Update password error:", error);
        res.status(500).json({ message: "Error updating password" });
      }

      res.status(200).json({ message: "Password successfully reset" });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({ message: "Error resetting password" });
    }
  },

  deleteAccount: async (req, res) => {
    // Fixing clearing cookies
    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      sameSite: "strict",
      path: "/",  // Added path
      maxAge: 0
    });

    const data = await User.deleteOne({ _id: req.user.id });

    res.status(204).send({
      success: true,
      message: "User account deleted successfully",
      data,
    });
  },
};
