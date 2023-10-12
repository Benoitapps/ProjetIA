const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local', override: true });

const BDD_URI = process.env.BDD;

async function connect() {
    console.log('Connecting to MongoDB...')
    try {
        await mongoose.connect(BDD_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
}

module.exports = { connect };
