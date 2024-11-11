const mongoose = require('mongoose');
const { Name } = require('./name-storage');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Kontaktna_forma', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Original Message Schema (just for reading existing messages)
const messageSchema = new mongoose.Schema({
    Ime: String
}, { 
    collection: 'FORMA'
});

const Message = mongoose.model('FORMA', messageSchema);

async function buildNamesCollection() {
    try {
        // Clear existing names
        await Name.deleteMany({});

        // Get all unique names from messages
        const uniqueNames = await Message.distinct('Ime');
        console.log(`Found ${uniqueNames.length} unique names`);

        // Create name records
        for (const name of uniqueNames) {
            if (name && name.trim()) {  // Check if name exists and is not empty
                await Name.create({
                    name: name.trim()
                });
            }
        }

        console.log('NAMES collection built successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error building NAMES collection:', error);
        process.exit(1);
    }
}

// Run the build
buildNamesCollection(); 