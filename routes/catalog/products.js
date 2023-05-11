// Imports
const express = require('express');
const prodModel = require('../../models/productsModel');

// Creating Router
const router = express.Router();

// CREATING ROUTES
// GET
router.get('/', async (req, res) => {
    try {
        console.log('abc');
        const product = await prodModel.find({ });
        res.send(product);
        console.log(product);
    } catch (err) {
        console.log("Getting all products from product catalog");
        res.json(err);
    }
})

//Exporting Routes
module.exports = router;