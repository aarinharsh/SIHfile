const express = require("express");

const Application = require("../models/Application");
const Scheme = require("../models/Scheme");
const Partner = require("../models/Partner");

const {
    requireLogin
} = require("../middleware/auth");

const router = express.Router();

router.get("/apply/:schemeId", requireLogin, async (req, res) => {

    const scheme = await Scheme.findById(req.params.schemeId);

    const partners = await Partner.find({
        active: true,
        supportedSchemes: scheme.name
    });

    res.render("apply", {
        scheme,
        partners
    });
});

router.post("/apply", requireLogin, async (req, res) => {

    const {
        scheme,
        partner,
        amount,
        purpose
    } = req.body;

    await Application.create({
        beneficiary: req.user.id,
        scheme,
        partner,
        amount,
        purpose,
        status: "SUBMITTED"
    });

    res.redirect("/applications");
});

router.get("/applications", requireLogin, async (req, res) => {

    const applications = await Application.find({
        beneficiary: req.user.id
    })
        .populate("scheme")
        .populate("partner")
        .sort({ createdAt: -1 });

    res.render("applications", {
        applications
    });
});

module.exports = router; 