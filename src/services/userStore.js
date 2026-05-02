const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/User");

const demoUsers = new Map();

function databaseReady() {
  return mongoose.connection.readyState === 1;
}

function sanitizeUser(user) {
  if (!user) return null;

  return {
    id: user._id ? user._id.toString() : user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone || "",
    gender: user.gender || "",
  };
}

async function createUser(payload) {
  const passwordHash = await bcrypt.hash(payload.password, 12);
  const userData = {
    name: payload.name.trim(),
    username: payload.username.trim().toLowerCase(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone.trim(),
    passwordHash,
    gender: payload.gender || "",
  };

  if (databaseReady()) {
    const existingUser = await User.findOne({
      $or: [{ username: userData.username }, { email: userData.email }],
    });

    if (existingUser) {
      const error = new Error("Username or email already exists.");
      error.statusCode = 409;
      throw error;
    }

    const createdUser = await User.create(userData);
    return sanitizeUser(createdUser);
  }

  if (demoUsers.has(userData.username)) {
    const error = new Error("Username already exists in demo mode.");
    error.statusCode = 409;
    throw error;
  }

  const demoUser = {
    id: `demo-${Date.now()}`,
    ...userData,
  };
  demoUsers.set(demoUser.username, demoUser);
  return sanitizeUser(demoUser);
}

async function verifyUser(username, password) {
  const normalizedUsername = username.trim().toLowerCase();
  const user = databaseReady()
    ? await User.findOne({ username: normalizedUsername })
    : demoUsers.get(normalizedUsername);

  if (!user) return null;

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  return isValidPassword ? sanitizeUser(user) : null;
}

module.exports = {
  createUser,
  verifyUser,
};
