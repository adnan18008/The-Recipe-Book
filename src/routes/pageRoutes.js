const express = require("express");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", (req, res) => {
  if (req.user) return res.redirect("/dashboard");
  return res.render("Login", { error: null });
});

router.get("/html/Login.html", (req, res) => {
  res.redirect("/");
});

router.get("/register", (req, res) => {
  if (req.user) return res.redirect("/dashboard");
  return res.render("register", { error: null });
});

router.get("/html/register.html", (req, res) => {
  res.redirect("/register");
});

router.get("/dashboard", requireAuth, (req, res) => {
  res.render("dashboard", { user: req.user });
});

router.get("/html/dashboard.html", (req, res) => {
  res.redirect("/dashboard");
});

router.get("/html/Homepage.html", (req, res) => {
  res.redirect("/dashboard");
});

router.get("/home", requireAuth, (req, res) => {
  res.redirect("/dashboard");
});

module.exports = router;
