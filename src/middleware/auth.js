const { cookieName, getSession } = require("../services/sessionStore");

function parseCookies(cookieHeader = "") {
  return cookieHeader.split(";").reduce((cookies, cookie) => {
    const [rawName, ...rawValue] = cookie.trim().split("=");
    if (!rawName) return cookies;
    cookies[rawName] = decodeURIComponent(rawValue.join("="));
    return cookies;
  }, {});
}

function attachUser(req, res, next) {
  const cookies = parseCookies(req.headers.cookie);
  const session = getSession(cookies[cookieName]);

  req.sessionToken = cookies[cookieName];
  req.user = session ? session.user : null;
  next();
}

function requireAuth(req, res, next) {
  if (req.user) return next();
  return res.redirect("/");
}

module.exports = {
  attachUser,
  requireAuth,
};
