const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema({
    name: String,

    type: {
        type: String,
        enum: ["BUSINESS", "EDUCATION"]
    },

    description: String,

    maxLoan: Number,

    interestRate: Number,

    moratoriumMonths: Number,

    maxTenureMonths: Number,

    eligiblePurpose: String,

    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Scheme", schemeSchema);