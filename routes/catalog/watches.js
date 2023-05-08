// Imports
const express = require('express');
const watchModel = require('../../models/watchModel');

// Creating Router
const router = express.Router();

// CREATING ROUTES
// GET
router.get('/', async (req, res) => {
    try {
        console.log('abc');
        const watch = await watchModel.find({ });
        res.send(watch);
        console.log(watch);
    } catch (err) {
        console.log("Getting watches from product catalog");
        res.json(err);
    }
})

//Exporting Routes
module.exports = router;