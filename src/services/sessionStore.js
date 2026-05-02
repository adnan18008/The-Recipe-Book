const crypto = require("crypto");

const sessions = new Map();
const cookieName = "recipebook_session";
const maxAgeMs = 1000 * 60 * 60 * 6;

function createSession(user) {
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, {
    user,
    expiresAt: Date.now() + maxAgeMs,
  });
  return token;
}

function getSession(token) {
  if (!token) return null;

  const session = sessions.get(token);
  if (!session) return null;

  if (session.expiresAt < Date.now()) {
    sessions.delete(token);
    return null;
  }

  session.expiresAt = Date.now() + maxAgeMs;
  return session;
}

function destroySession(token) {
  if (token) sessions.delete(token);
}

function getCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: maxAgeMs,
  };
}

module.exports = {
  cookieName,
  createSession,
  destroySession,
  getCookieOptions,
  getSession,
};
