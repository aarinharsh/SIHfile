require("dotenv").config();

const connectDB = require("./config/db");

const Scheme = require("./models/Scheme");
const Partner = require("./models/Partner");

async function seed() {

    await connectDB();

    await Scheme.deleteMany({});
    await Partner.deleteMany({});

    await Scheme.insertMany([

        {
            name: "Micro Finance",
            type: "BUSINESS",
            description: "Demo scheme for eligible small income-generating activities.",
            maxLoan: 140000,
            interestRate: 6.5,
            moratoriumMonths: 3,
            maxTenureMonths: 60,
            eligiblePurpose: "Small business",
            active: true
        },

        {
            name: "Term Loan",
            type: "BUSINESS",
            description: "Demo scheme for eligible larger income-generating projects.",
            maxLoan: 5000000,
            interestRate: 8,
            moratoriumMonths: 6,
            maxTenureMonths: 84,
            eligiblePurpose: "Business/project",
            active: true
        },

        {
            name: "Education Loan",
            type: "EDUCATION",
            description: "Demo education financing option.",
            maxLoan: 5000000,
            interestRate: 8,
            moratoriumMonths: 12,
            maxTenureMonths: 120,
            eligiblePurpose: "Higher education",
            active: true
        }

    ]);

    const schemes = await Scheme.find();

    await Partner.insertMany([

        {
            name: "Demo State Channel Agency",
            type: "SCA",
            address: "Lucknow, Uttar Pradesh",
            district: "Lucknow",
            state: "Uttar Pradesh",
            supportedSchemes: schemes.map(s => s.name),
            latitude: 26.8467,
            longitude: 80.9462,
            fundStatus: "AVAILABLE"
        },

        {
            name: "Demo Public Sector Bank",
            type: "PSB",
            address: "New Delhi",
            district: "New Delhi",
            state: "Delhi",
            supportedSchemes: schemes.map(s => s.name),
            latitude: 28.6139,
            longitude: 77.2090,
            fundStatus: "AVAILABLE"
        },

        {
            name: "Demo Regional Rural Bank",
            type: "RRB",
            address: "Jaipur, Rajasthan",
            district: "Jaipur",
            state: "Rajasthan",
            supportedSchemes: ["Micro Finance", "Term Loan"],
            latitude: 26.9124,
            longitude: 75.7873,
            fundStatus: "LIMITED"
        },

        {
            name: "Demo NBFC-MFI",
            type: "NBFC_MFI",
            address: "Patna, Bihar",
            district: "Patna",
            state: "Bihar",
            supportedSchemes: ["Micro Finance"],
            latitude: 25.5941,
            longitude: 85.1376,
            fundStatus: "AVAILABLE"
        }

    ]);

    console.log("Demo data inserted successfully");

    process.exit();
}

seed();