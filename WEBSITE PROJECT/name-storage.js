const mongoose = require('mongoose');
const dbConfig = require('./config/database');

// Connect to MongoDB (use a separate connection for NAMES)
const namesDB = mongoose.createConnection(dbConfig.mongoURI, dbConfig.options);

// Simple Name Schema
const nameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, { 
    collection: 'NAMES',
    versionKey: false
});

const Name = namesDB.model('NAMES', nameSchema);

// Function to store name
async function storeName(name) {
    try {
        const cleanName = name.trim();
        if (cleanName) {
            await Name.findOneAndUpdate(
                { name: cleanName },
                { name: cleanName },
                { upsert: true }
            );
        }
    } catch (error) {
        console.error('Error storing name:', error);
    }
}

module.exports = { storeName, Name }; 