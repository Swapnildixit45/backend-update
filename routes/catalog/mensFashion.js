// Imports
const express = require('express');
const menModel = require('../../models/menModel');

// Creating Router
const router = express.Router();

// CREATING ROUTES
// GET
router.get('/', async (req, res) => {
    try {
        console.log('abc');
        const men = await menModel.find({ });
        res.send(men);
        console.log(men);
    } catch (err) {
        console.log("Getting men's fashion items from product catalog");
        res.json(err);
    }
})

//Exporting Routes
module.exports = router;