const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
module.exports = async (req, res, next) => {
 
  
  const auth = req.headers?.authorization || null;
  const accessToken = auth ? auth.split(" ")[1] : null; // Remove 'Bearer' from the token

  if (accessToken) {
    // Verify the access token
    jwt.verify(accessToken, process.env.ACCESS_KEY, (err, data) => {
      if (err) {
        // If access token is invalid or expired
        throw new Error("Access token invalid or expired");
      } else {
        req.user = data; // Attach user data from the token payload
      }
    });

  } else if (req.cookies?.refreshToken) {
    // If no access token, check for a refresh token in cookies
    const refreshToken = req.cookies.refreshToken;

    jwt.verify(refreshToken, process.env.REFRESH_KEY, async (err, data) => {
      if (err) {
        throw new Error("Refresh token invalid or expired");
      } else {
        const { _id, password } = data;
        const user = await User.findOne({ _id }).select("+password");

        if (user && user.password === password) {
          // Generate a new access token and attach to req.user
          const newAccessToken = jwt.sign(
            user.toJSON(),
            process.env.ACCESS_KEY,
            { expiresIn: "120min" }
          );

          req.user = user;
          res.setHeader("Authorization", `Bearer ${newAccessToken}`); // Send the new access token to the client
        } else {
          throw new Error("User not found or invalid token");
        }
      }
    });
  } else {
    // If neither token is present
    res.errorStatusCode = 401;
    throw new Error("Not authorized to access this route");
  }

  console.log("User:", req.user);
  next();
};
