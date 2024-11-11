const mongoose = require('mongoose');
const dbConfig = require('./config/database');

// Connect to MongoDB (use a separate connection for EMAILS)
const emailsDB = mongoose.createConnection(dbConfig.mongoURI, dbConfig.options);

// Simple Email Schema
const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    }
}, { 
    collection: 'EMAILS',
    versionKey: false
});

const Email = emailsDB.model('EMAILS', emailSchema);

// Function to store email
async function storeEmail(email) {
    try {
        const cleanEmail = email.toLowerCase().trim();
        await Email.findOneAndUpdate(
            { email: cleanEmail },
            { email: cleanEmail },
            { upsert: true }
        );
    } catch (error) {
        console.error('Error storing email:', error);
    }
}

module.exports = { storeEmail, Email }; 