const express = require("express");

const Scheme = require("../models/Scheme");

const router = express.Router();

router.get("/schemes", async (req, res) => {

    const schemes = await Scheme.find({ active: true });

    res.render("schemes", { schemes });
});

router.get("/scheme/recommend", (req, res) => {
    res.render("recommend", { results: null });
});

router.post("/scheme/recommend", async (req, res) => {

    const {
        purpose,
        income,
        amount
    } = req.body;

    const schemes = await Scheme.find({ active: true });

    const suitable = schemes.filter(scheme => {

        if (Number(amount) > scheme.maxLoan) {
            return false;
        }

        if (
            purpose === "EDUCATION" &&
            scheme.type !== "EDUCATION"
        ) {
            return false;
        }

        if (
            purpose === "BUSINESS" &&
            scheme.type !== "BUSINESS"
        ) {
            return false;
        }

        return true;
    });

    res.render("recommend", {
        results: suitable,
        income,
        amount,
        purpose
    });
});

router.get("/calculator", async (req, res) => {

    const schemes = await Scheme.find({ active: true });

    res.render("calculator", { schemes });
});

module.exports = router;