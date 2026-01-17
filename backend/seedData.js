require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./schemas/user');
const Category = require('./schemas/category');
const Product = require('./schemas/product');
const Order = require('./schemas/order');

// Sample data
const sampleUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "$2a$10$uQyE2XzUZlVzD8JvJGZvzeJGZvzeJGZvzeJGZvzeJGZvzeJGZvzeJG", // bcrypt hash for 'password123'
    role: "user",
    address: [{ street: "123 Main St", city: "New York", zipCode: "10001" }]
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "$2a$10$uQyE2XzUZlVzD8JvJGZvzeJGZvzeJGZvzeJGZvzeJGZvzeJGZvzeJG", // bcrypt hash for 'password123'
    role: "user",
    address: [{ street: "456 Oak Ave", city: "Los Angeles", zipCode: "90210" }]
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "$2a$10$uQyE2XzUZlVzD8JvJGZvzeJGZvzeJGZvzeJGZvzeJGZvzeJGZvzeJG", // bcrypt hash for 'password123'
    role: "admin",
    address: [{ street: "789 Admin Blvd", city: "Chicago", zipCode: "60601" }]
  }
];

const sampleCategories = [
  { name: "Electronics", description: "Electronic devices and gadgets" },
  { name: "Clothing", description: "Apparel and fashion items" },
  { name: "Home & Kitchen", description: "Home appliances and kitchen items" },
  { name: "Books", description: "Books and educational materials" },
  { name: "Sports", description: "Sports equipment and accessories" }
];

const sampleProducts = [
  {
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 199.99,
    category: null, // Will be filled with ObjectId after category is created
    images: ["https://example.com/headphones.jpg"],
    stock: 50,
    flashSale: {
      isActive: true,
      discountPercentage: 30,
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      originalPrice: 199.99
    },
    salesCount: 125,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    name: "Smartphone",
    description: "Latest model smartphone with advanced features",
    price: 899.99,
    category: null, // Will be filled with ObjectId after category is created
    images: ["https://example.com/smartphone.jpg"],
    stock: 25,
    flashSale: {
      isActive: true,
      discountPercentage: 15,
      endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      originalPrice: 899.99
    },
    salesCount: 89,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    name: "Running Shoes",
    description: "Comfortable running shoes for athletes",
    price: 129.99,
    category: null, // Will be filled with ObjectId after category is created
    images: ["https://example.com/shoes.jpg"],
    stock: 100,
    flashSale: {
      isActive: false,
      discountPercentage: 0,
      endTime: null,
      originalPrice: 129.99
    },
    salesCount: 210,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
  },
  {
    name: "Coffee Maker",
    description: "Automatic coffee maker with timer",
    price: 79.99,
    category: null, // Will be filled with ObjectId after category is created
    images: ["https://example.com/coffeemaker.jpg"],
    stock: 30,
    flashSale: {
      isActive: false,
      discountPercentage: 0,
      endTime: null,
      originalPrice: 79.99
    },
    salesCount: 67,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago (new arrival)
  },
  {
    name: "Laptop",
    description: "Powerful laptop for work and gaming",
    price: 1299.99,
    category: null, // Will be filled with ObjectId after category is created
    images: ["https://example.com/laptop.jpg"],
    stock: 15,
    flashSale: {
      isActive: true,
      discountPercentage: 25,
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      originalPrice: 1299.99
    },
    salesCount: 45,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) // 15 days ago
  },
  {
    name: "Winter Jacket",
    description: "Warm winter jacket for cold weather",
    price: 149.99,
    category: null, // Will be filled with ObjectId after category is created
    images: ["https://example.com/jacket.jpg"],
    stock: 40,
    flashSale: {
      isActive: false,
      discountPercentage: 0,
      endTime: null,
      originalPrice: 149.99
    },
    salesCount: 32,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) // 20 days ago
  },
  {
    name: "Desk Lamp",
    description: "LED desk lamp with adjustable brightness",
    price: 39.99,
    category: null, // Will be filled with ObjectId after category is created
    images: ["https://example.com/lamp.jpg"],
    stock: 75,
    flashSale: {
      isActive: true,
      discountPercentage: 40,
      endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
      originalPrice: 39.99
    },
    salesCount: 89,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with great sound quality",
    price: 89.99,
    category: null, // Will be filled with ObjectId after category is created
    images: ["https://example.com/speaker.jpg"],
    stock: 60,
    flashSale: {
      isActive: false,
      discountPercentage: 0,
      endTime: null,
      originalPrice: 89.99
    },
    salesCount: 156,
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000) // 25 days ago
  },
  {
    name: "Smart Watch",
    description: "Feature-rich smartwatch with health monitoring",
    price: 299.99,
    category: null, // Will be filled with ObjectId after category is created
    images: ["https://example.com/watch.jpg"],
    stock: 35,
    flashSale: {
      isActive: true,
      discountPercentage: 20,
      endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      originalPrice: 299.99
    },
    salesCount: 78,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) // 12 days ago
  },
  {
    name: "Gaming Mouse",
    description: "High-precision gaming mouse with RGB lighting",
    price: 59.99,
    category: null, // Will be filled with ObjectId after category is created
    images: ["https://example.com/mouse.jpg"],
    stock: 80,
    flashSale: {
      isActive: false,
      discountPercentage: 0,
      endTime: null,
      originalPrice: 59.99
    },
    salesCount: 92,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago (new arrival)
  }
];

const sampleOrders = [
  {
    user: null, // Will be filled with ObjectId after user is created
    products: [
      {
        product: null, // Will be filled with ObjectId after product is created
        quantity: 2,
        price: 199.99
      }
    ],
    totalPrice: 399.98,
    paymentstatus: 'paid',
    status: 'delivered',
    shippingAddress: { street: "123 Main St", city: "New York", zipCode: "10001" },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    user: null, // Will be filled with ObjectId after user is created
    products: [
      {
        product: null, // Will be filled with ObjectId after product is created
        quantity: 1,
        price: 899.99
      },
      {
        product: null, // Will be filled with ObjectId after product is created
        quantity: 1,
        price: 129.99
      }
    ],
    totalPrice: 1029.98,
    paymentstatus: 'paid',
    status: 'delivered',
    shippingAddress: { street: "456 Oak Ave", city: "Los Angeles", zipCode: "90210" },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
  },
  {
    user: null, // Will be filled with ObjectId after user is created
    products: [
      {
        product: null, // Will be filled with ObjectId after product is created
        quantity: 1,
        price: 79.99
      }
    ],
    totalPrice: 79.99,
    paymentstatus: 'paid',
    status: 'pending',
    shippingAddress: { street: "123 Main St", city: "New York", zipCode: "10001" },
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB using environment variable
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL environment variable is required');
    }
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    // Insert categories
    console.log('Inserting categories...');
    const categories = await Category.insertMany(sampleCategories);
    
    // Update products to reference the created categories
    const productsWithCategories = sampleProducts.map((product, index) => ({
      ...product,
      category: categories[index % categories.length]._id
    }));
    
    // Insert users
    console.log('Inserting users...');
    const users = await User.insertMany(sampleUsers);
    
    // Insert products
    console.log('Inserting products...');
    const products = await Product.insertMany(productsWithCategories);
    
    // Update orders to reference the created users and products
    const ordersWithReferences = sampleOrders.map((order, index) => {
      return {
        ...order,
        user: users[index % users.length]._id,
        products: order.products.map((item, itemIndex) => ({
          ...item,
          product: products[(index + itemIndex) % products.length]._id,
          price: products[(index + itemIndex) % products.length].price
        }))
      };
    });
    
    // Insert orders
    console.log('Inserting orders...');
    await Order.insertMany(ordersWithReferences);

    console.log('Database seeded successfully!');
    console.log(`Inserted ${users.length} users`);
    console.log(`Inserted ${categories.length} categories`);
    console.log(`Inserted ${products.length} products`);
    console.log(`${ordersWithReferences.length} orders created`);

    // Close connection
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run the seeding function
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;