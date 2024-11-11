const config = {
    development: {
        mongoURI: 'mongodb://127.0.0.1:27017/Kontaktna_forma',
        options: {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        }
    },
    production: {
        mongoURI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Kontaktna_forma',
        options: {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        }
    }
};

// Set environment
const env = process.env.NODE_ENV || 'development';

module.exports = config[env]; 