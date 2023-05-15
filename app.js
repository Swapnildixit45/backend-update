// imports 
const express = require('express');
const connectDB = require('./config/db');
const stripe = require('stripe')('sk_test_51N6tgNSEf3gYCXWg4gSHNCQT8eyExVB6iu9gEAD6cMrhcPfTtqwrRKM0POU1jPcUuyJZsDmxYQLON1TnLcSa6y1C00CGkJi2Up');
const cors = require('cors');
// const bodyParser = require('body-parser'); // MIDDLEWARE ONLY

// creating express variable
const app = express();
app.use(cors());
app.use(express.static("public"))
app.use(express.json());

// IMPORT ROUTES //
app.get('/', (req, res) => res.send('Hello world!'));
// catalog
const cosRoute = require('./routes/catalog/cosmetics');
const elecRoute = require('./routes/catalog/electronics');
const menRoute = require('./routes/catalog/mensFashion');
const jewelRoute = require('./routes/catalog/jewellery');
const womenRoute = require('./routes/catalog/womensFashion');
const watchRoute = require('./routes/catalog/watches');
const prodRoute = require('./routes/catalog/products')

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



// CREATING ROUTES //
// catalog
app.use('/catalog/cosmetics', cosRoute);
app.use('/catalog/electronics', elecRoute);
app.use('/catalog/watches', watchRoute);
app.use('/catalog/mensFashion', menRoute);
app.use('/catalog/jewellery', jewelRoute);
app.use('/catalog/womensFashion', womenRoute);
app.use('/catalog/products', prodRoute);

app.post('/checkout', async (req, res) => {
    if (req.method === 'POST') {
        try {
            const params = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                line_items: req.body.map((item) => {
                    return {
                        price_data: {
                            currency: 'inr',
                            product_data: {
                                name: item.title,
                            },
                            unit_amount: item.price.value * 100,
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity
                    }
                }),
                success_url: 'http://localhost:3000/success',
                cancel_url: 'http://localhost:3000/canceled',
            }

            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);

            res.status(200).json(session);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
})

// start server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));