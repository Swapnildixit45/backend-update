const mongoose = require('mongoose');

const watchSchema = new mongoose.Schema({
    price: {
        currency: { type: String },
        value: { type: Number },
    },
    stars: { type: Number },
    brand: { type: String },
    title: { type: String },
    description: { type: String },
});

module.exports = mongoose.model('Watche', watchSchema);