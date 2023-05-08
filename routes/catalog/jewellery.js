// Imports
const express = require('express');
const jewelModel = require('../../models/jewelModel');

// Creating Router
const router = express.Router();

// CREATING ROUTES
// GET
router.get('/', async (req, res) => {
    try {
        console.log('abc');
        const jewel = await jewelModel.find({ });
        res.send(jewel);
        console.log(jewel);
    } catch (err) {
        console.log("Getting jewellery from product catalog");
        res.json(err);
    }
})

//Exporting Routes
module.exports = router;