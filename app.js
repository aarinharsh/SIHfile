require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/auth"));
app.use("/", require("./routes/scheme"));
app.use("/", require("./routes/partner"));
app.use("/", require("./routes/application"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/dashboard", require("./middleware/auth").requireLogin, (req, res) => {
    res.render("dashboard", { user: req.user });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});