const path = require("path");
const express = require("express");
const loadEnv = require("./config/env");
const { connectDatabase } = require("./config/database");
const { attachUser } = require("./middleware/auth");
const authRoutes = require("./routes/authRoutes");
const pageRoutes = require("./routes/pageRoutes");

loadEnv();

const app = express();
const port = process.env.PORT || 5000;

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "../Client/html"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(attachUser);
app.use(pageRoutes);
app.use(authRoutes);
app.use(express.static(path.join(__dirname, "../Client")));

connectDatabase().finally(() => {
  app.listen(port, () => {
    console.log(`RecipeBook running at http://localhost:${port}`);
  });
});
