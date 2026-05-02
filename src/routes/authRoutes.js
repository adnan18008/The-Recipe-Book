const express = require("express");
const { createUser, verifyUser } = require("../services/userStore");
const {
  cookieName,
  createSession,
  destroySession,
  getCookieOptions,
} = require("../services/sessionStore");

const router = express.Router();

function validatePassword(password) {
  return typeof password === "string" && password.length >= 8;
}

router.post("/login", async (req, res) => {
  try {
    const { username = "", password = "" } = req.body;

    if (!username.trim() || !password) {
      return res.status(400).render("Login", {
        error: "Enter your username and password.",
      });
    }

    const user = await verifyUser(username, password);
    if (!user) {
      return res.status(401).render("Login", {
        error: "Invalid username or password.",
      });
    }

    const token = createSession(user);
    res.cookie(cookieName, token, getCookieOptions());
    return res.redirect("/dashboard");
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).render("Login", {
      error: "We could not sign you in. Please try again.",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).render("register", {
        error: "Passwords do not match.",
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).render("register", {
        error: "Use at least 8 characters for your password.",
      });
    }

    const user = await createUser(req.body);
    const token = createSession(user);
    res.cookie(cookieName, token, getCookieOptions());
    return res.redirect("/dashboard");
  } catch (error) {
    console.error("Registration error:", error.message);
    return res.status(error.statusCode || 500).render("register", {
      error: error.message || "We could not create your account.",
    });
  }
});

router.post("/logout", (req, res) => {
  destroySession(req.sessionToken);
  res.clearCookie(cookieName);
  res.redirect("/");
});

module.exports = router;
