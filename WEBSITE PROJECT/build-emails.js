const mongoose = require('mongoose');
const { Email } = require('./email-storage');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Kontaktna_forma', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Original Message Schema (just for reading existing messages)
const messageSchema = new mongoose.Schema({
    e_mail: String
}, { 
    collection: 'FORMA'
});

const Message = mongoose.model('FORMA', messageSchema);

async function buildEmailsCollection() {
    try {
        // Clear existing emails
        await Email.deleteMany({});

        // Get all unique emails from messages
        const uniqueEmails = await Message.distinct('e_mail');
        console.log(`Found ${uniqueEmails.length} unique emails`);

        // Create email records
        for (const email of uniqueEmails) {
            if (email) {  // Check if email exists
                await Email.create({
                    email: email.toLowerCase().trim()
                });
            }
        }

        console.log('EMAILS collection built successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error building EMAILS collection:', error);
        process.exit(1);
    }
}

// Run the build
buildEmailsCollection(); 