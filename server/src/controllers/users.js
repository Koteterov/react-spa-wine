const router = require("express").Router();
const api = require("../services/user");
const validator = require("validator");

const { SESSION_NAME } = require("../config/constants");
const { isAuth } = require("../middlewares/guards");

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email!");
    }

    const result = await api.register(firstName, lastName, email, password);
    const token = result.accessToken;

    res.cookie(SESSION_NAME, token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await api.login(email, password);
    const token = result.accessToken;

    res.cookie(SESSION_NAME, token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

router.post("/logout", (req, res) => {
  try {
    api.logout(req.user?.token);

    res.clearCookie(SESSION_NAME, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/profile", async (req, res) => {
  try {
    const result = await api.getProfileInfo(req.user._id);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
