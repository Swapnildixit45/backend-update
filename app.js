// imports 
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
// const bodyParser = require('body-parser'); // MIDDLEWARE ONLY

// creating express variable
const app = express();

// IMPORT ROUTES //
app.get('/', (req, res) => res.send('Hello world!'));
// catalog
const cosRoute = require('./routes/catalog/cosmetics');
const elecRoute = require('./routes/catalog/electronics');
const menRoute = require('./routes/catalog/mensFashion');
const jewelRoute = require('./routes/catalog/jewellery');
const womenRoute = require('./routes/catalog/womensFashion');
const watchRoute = require('./routes/catalog/watches');

//connecting to database 
const conn = connectDB();

var mongoose = require('mongoose');
var collections = mongoose.connections[0].collections;
var names = [];

Object.keys(collections).forEach(function(k) {
    names.push(k);
});

console.log(names);

console.log(mongoose.modelNames());

app.use(express.json());
// Using cors package to allow cross-platform data distribution
app.use(cors());

// CREATING ROUTES //
// catalog
app.use('/catalog/cosmetics', cosRoute);
app.use('/catalog/electronics', elecRoute);
app.use('/catalog/watches', watchRoute);
app.use('/catalog/mensFashion', menRoute);
app.use('/catalog/jewellery', jewelRoute);
app.use('/catalog/womensFashion', womenRoute);

// start server
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));