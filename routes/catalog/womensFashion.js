// Imports
const express = require('express');
const womenModel = require('../../models/womenModel');

// Creating Router
const router = express.Router();

// CREATING ROUTES
// GET
router.get('/', async (req, res) => {
    try {
        console.log('abc');
        const women = await womenModel.find({ });
        res.send(women);
        console.log(women);
    } catch (err) {
        console.log("Getting women's fashion items from product catalog");
        res.json(err);
    }
})

//Exporting Routes
module.exports = router;