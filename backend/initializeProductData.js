require('dotenv').config();
const mongoose = require('mongoose');
const { updateAllProductsInfo } = require('./utils/productHelpers');

async function initializeProductData() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');

        // Update all product ratings and discount information
        await updateAllProductsInfo();

        console.log('Product data initialization completed successfully!');
        
        // Close connection
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error initializing product data:', error);
    }
}

// Run the initialization
if (require.main === module) {
    initializeProductData();
}

module.exports = initializeProductData;