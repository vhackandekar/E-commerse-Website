const Product = require('../schemas/product');
const Order = require('../schemas/order');
const Category = require('../schemas/category');
const mongoose = require('mongoose');

// Get active flash sale products
module.exports.getActiveFlashSales = async (req, res) => {
    try {
        const now = new Date();
        
        const flashSaleProducts = await Product.find({
            'flashSale.isActive': true,
            'flashSale.endTime': { $gt: now }
        })
        .populate('category')
        .select('-__v');
        
        res.status(200).json({
            success: true,
            count: flashSaleProducts.length,
            data: flashSaleProducts
        });
    } catch (error) {
        console.error('Error fetching flash sale products:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching flash sale products'
        });
    }
};

// Get this month's best sellers
module.exports.getMonthlyBestSellers = async (req, res) => {
    try {
        // Calculate start and end of current month
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

        // Find orders from this month that are paid
        const orders = await Order.find({
            createdAt: { $gte: startOfMonth, $lte: endOfMonth },
            paymentstatus: 'paid'
        }).populate({
            path: 'products.product',
            model: 'Product'
        });

        // Aggregate sales counts by product
        const salesMap = {};
        
        orders.forEach(order => {
            order.products.forEach(item => {
                const productId = item.product._id.toString();
                if (salesMap[productId]) {
                    salesMap[productId] += item.quantity;
                } else {
                    salesMap[productId] = item.quantity;
                }
            });
        });

        // Convert to array and sort by sales count
        const bestSellers = Object.entries(salesMap)
            .map(([productId, totalQuantity]) => ({
                productId,
                totalQuantity
            }))
            .sort((a, b) => b.totalQuantity - a.totalQuantity)
            .slice(0, 10); // Top 10 best sellers

        // Get product details for best sellers
        const bestSellerProducts = [];
        for (const bestSeller of bestSellers) {
            const product = await Product.findById(bestSeller.productId)
                .populate('category')
                .select('-__v');
            
            if (product) {
                bestSellerProducts.push({
                    ...product.toObject(),
                    monthlySales: bestSeller.totalQuantity
                });
            }
        }

        res.status(200).json({
            success: true,
            count: bestSellerProducts.length,
            data: bestSellerProducts
        });
    } catch (error) {
        console.error('Error fetching monthly best sellers:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching best sellers'
        });
    }
};

// Get new arrival products
module.exports.getNewArrivals = async (req, res) => {
    try {
        const newArrivalProducts = await Product.find({})
            .populate('category')
            .sort({ createdAt: -1 }) // Sort by creation date descending
            .limit(10) // Limit to last 10 products
            .select('-__v');
        
        res.status(200).json({
            success: true,
            count: newArrivalProducts.length,
            data: newArrivalProducts
        });
    } catch (error) {
        console.error('Error fetching new arrivals:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching new arrivals'
        });
    }
};

// Helper function to update sales count when an order is placed
module.exports.updateSalesCount = async (order) => {
    try {
        for (const item of order.products) {
            await Product.findByIdAndUpdate(
                item.product,
                { $inc: { salesCount: item.quantity } },
                { new: true }
            );
        }
    } catch (error) {
        console.error('Error updating sales count:', error);
    }
};

// Get all products
module.exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
            .populate('category')
            .select('-__v')
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching products'
        });
    }
};

// Get single product by ID
module.exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('category')
            .select('-__v');
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching product'
        });
    }
};

// Create new product
module.exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, images, stock, flashSale } = req.body;
        
        const product = await Product.create({
            name,
            description,
            price,
            category,
            images: images || [],
            stock,
            flashSale: flashSale || {
                isActive: false,
                discountPercentage: 0,
                endTime: null,
                originalPrice: price
            }
        });
        
        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating product'
        });
    }
};

// Update product
module.exports.updateProduct = async (req, res) => {
    try {
        const allowedUpdates = ['name', 'description', 'price', 'category', 'images', 'stock', 'flashSale'];
        const updates = Object.keys(req.body);
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));
        
        if (!isValidOperation) {
            return res.status(400).json({
                success: false,
                message: 'Invalid updates!'
            });
        }
        
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).populate('category');
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating product'
        });
    }
};

// Delete product
module.exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting product'
        });
    }
};