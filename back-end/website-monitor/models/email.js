const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
    useremail: {
        type: String,
        required: true,
    },
    monitorurl: {
        type: String,
        required: true,
    },
    currentstatus: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Email", emailSchema);