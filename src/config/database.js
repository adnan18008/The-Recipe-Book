const mongoose = require("mongoose");

const isConfigured = Boolean(process.env.MONGODB_URI);

async function connectDatabase() {
  if (!isConfigured) {
    console.log("MONGODB_URI not set. Using in-memory demo accounts.");
    return false;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Database connected successfully.");
    return true;
  } catch (error) {
    console.error("Database connection failed:", error.message);
    console.log("Continuing with in-memory demo accounts.");
    return false;
  }
}

module.exports = {
  connectDatabase,
  isConfigured,
};
