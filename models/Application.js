const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    beneficiary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    scheme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Scheme"
    },

    partner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Partner"
    },

    amount: Number,

    purpose: String,

    status: {
        type: String,
        enum: [
            "SUBMITTED",
            "UNDER_REVIEW",
            "DOCUMENT_REQUIRED",
            "APPROVED",
            "REJECTED",
            "DISBURSED"
        ],
        default: "SUBMITTED"
    },

    remarks: String

}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);