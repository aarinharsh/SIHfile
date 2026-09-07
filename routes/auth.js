const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", async (req, res) => {

    try {

        const { name, email, mobile, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.send("Passwords do not match");
        }

        const existing = await User.findOne({ email });

        if (existing) {
            return res.send("Email already registered");
        }

        const passwordHash = await bcrypt.hash(password, 12);

        await User.create({
            name,
            email,
            mobile,
            passwordHash,
            role: "BENEFICIARY"
        });

        res.redirect("/login");

    } catch (error) {
        console.error(error);
        res.status(500).send("Registration failed");
    }
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.send("Invalid email or password");
        }

        const valid = await bcrypt.compare(password, user.passwordHash);

        if (!valid) {
            return res.send("Invalid email or password");
        }

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax"
        });

        res.redirect("/dashboard");

    } catch (error) {
        console.error(error);
        res.status(500).send("Login failed");
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});

module.exports = router;