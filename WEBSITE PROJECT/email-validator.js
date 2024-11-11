// List of valid email domains with their providers
const validDomains = {
    // Croatian providers
    't.ht.hr': true,
    'gmail.hr': true,
    'yahoo.hr': true,
    'inet.hr': true,
    'xnet.hr': true,
    'vip.hr': true,
    'zagreb.hr': true,
    'net.hr': true,
    'zg.hr': true,
    'hr': true,
    'tel.hr': true,
    'vz.hr': true,
    'os.hr': true,
    'ri.hr': true,
    'optinet.hr': true,
    'globalnet.hr': true,
    'gmail.com': true,  // Keep gmail.com as it's commonly used
    
    // Academic/Business
    'fer.hr': true,
    'pmf.hr': true,
    'ffzg.hr': true,
    'unizg.hr': true,
    'efzg.hr': true,
    'fsb.hr': true,
    'pravo.hr': true,
    'unin.hr': true,
    
    // Add more Croatian domains as needed
};

function isValidEmailDomain(email) {
    try {
        // Extract the domain part after @
        const domainPart = email.split('@')[1];
        if (!domainPart) return false;

        // Check if the exact domain is in our valid domains list
        return validDomains[domainPart] === true;

    } catch (error) {
        console.error('Email validation error:', error);
        return false;
    }
}

// Function to get list of valid domains (for frontend display)
function getValidDomains() {
    return Object.keys(validDomains);
}

module.exports = { isValidEmailDomain, getValidDomains }; 