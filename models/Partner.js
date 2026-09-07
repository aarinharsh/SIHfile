const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
    name: String,

    type: {
        type: String,
        enum: ["SCA", "PSB", "RRB", "NBFC_MFI"]
    },

    address: String,

    district: String,

    state: String,

    supportedSchemes: [String],

    latitude: Number,

    longitude: Number,

    active: {
        type: Boolean,
        default: true
    },

    fundStatus: {
        type: String,
        enum: ["AVAILABLE", "LIMITED", "UNAVAILABLE"],
        default: "AVAILABLE"
    }
}, { timestamps: true });

module.exports = mongoose.model("Partner", partnerSchema);