const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    images: {
        type: [String]
    },
    stock: {
        type: Number,
        required: true
    },
    // Flash Sale Fields
    flashSale: {
        isActive: {
            type: Boolean,
            default: false
        },
        discountPercentage: {
            type: Number,
            min: 0,
            max: 100
        },
        endTime: {
            type: Date
        },
        originalPrice: {
            type: Number
        }
    },
    // Sales tracking for best sellers
    salesCount: {
        type: Number,
        default: 0
    },
    
    // Rating system
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    
    // Enhanced discount information for frontend display
    discountInfo: {
        isActive: {
            type: Boolean,
            default: false
        },
        percentage: {
            type: Number,
            min: 0,
            max: 100
        },
        amount: {
            type: Number,
            default: 0
        },
        savings: {
            type: Number,
            default: 0
        },
        endTime: {
            type: Date
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('Product',productSchema);
