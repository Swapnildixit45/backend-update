// Imports
const express = require('express');
const elecModel = require('../../models/elecModel');

// Creating Router
const router = express.Router();

// CREATING ROUTES
// GET
router.get('/', async (req, res) => {
    try {
        console.log('abc');
        const elec = await elecModel.find({ });
        res.send(elec);
        console.log(elec);
    } catch (err) {
        console.log("Getting electronics from product catalog");
        res.json(err);
    }
})

//Exporting Routes
module.exports = router;