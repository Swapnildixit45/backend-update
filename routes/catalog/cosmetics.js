// Imports
const express = require('express');
const cosModel = require('../../models/cosModel');

// Creating Router
const router = express.Router();

// CREATING ROUTES
// GET
router.get('/', async (req, res) => {
    try {
        console.log('abc');
        const cos = await cosModel.find({ });
        res.send(cos);
        console.log(cos);
    } catch (err) {
        console.log("Getting cosmetics from product catalog");
        res.json(err);
    }
})

//Exporting Routes
module.exports = router;