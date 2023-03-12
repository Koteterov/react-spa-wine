const { validateToken } = require("../services/user");
const { SESSION_NAME } = require("../config/constants");

module.exports = () => (req, res, next) => {
  const token = req.cookies[SESSION_NAME] || "";


  if (token) {
    try {
      const payload = validateToken(token);
      req.user = {
        email: payload.email,
        _id: payload._id,
        token,
      };
    } catch (err) {
      console.error(err);
      res.clearCookie(SESSION_NAME);
      return res
        .status(401)
        .json({ message: "Invalid access token. Please log in" });
    }
  }

  next();
};
