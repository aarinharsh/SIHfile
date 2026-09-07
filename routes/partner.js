const express = require("express");

const Partner = require("../models/Partner");

const router = express.Router();

router.get("/partners", async (req, res) => {

    const partners = await Partner.find({
        active: true
    });

    res.render("partner", { partners });
});

module.exports = router;