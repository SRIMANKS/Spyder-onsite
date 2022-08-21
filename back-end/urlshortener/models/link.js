const mongoose = require('mongoose');
const linkSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    }
});
module.exports = mongoose.model('Link', linkSchema);