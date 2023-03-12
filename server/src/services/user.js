const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const {  JWT_SECRET, SALT_ROUNDS } = require("../config/constants");


const blacklist = new Set();


async function register(firstName, lastName, email, password) {
  // check if email is taken
  const existing = await User.findOne({ email: new RegExp(`^${email}$`, "i") });

  if (existing) {
    throw new Error("Email is already taken");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // store user
  const user = new User({
    firstName,
    lastName,
    email,
    hashedPassword,
  });

  await user.save();

  return createSession(user);
}

async function login(email, password) {
  // check if user exists
  const user = await User.findOne({ email: new RegExp(`^${email}$`, "i") });

  if (!user) {
    throw new Error("Incorrect email or password");
  }

  // verify password
  const match = await bcrypt.compare(password, user.hashedPassword);

  if (!match) {
    throw new Error("Incorrect email or password");
  }

  return createSession(user);
}

async function getProfileInfo(userId) {

 return await User.findOne({ _id: userId }, { hashedPassword: 0, __v: 0 }) 
}


function logout(token) {
  blacklist.add(token);
}

function createSession(user) {
  const payload = {
    email: user.email,
    _id: user._id,
  };
  const option = { expiresIn: "2d" };


  const accessToken = jwt.sign(payload, JWT_SECRET, option);

  return {
    email: user.email,
    accessToken,
    _id: user._id,
  };
}

function validateToken(token) {
  if (blacklist.has(token)) {
    throw new Error("Token is blacklisted");
  }
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  register,
  login,
  logout,
  getProfileInfo,
  validateToken,
};
