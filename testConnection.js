// Load environment variables from .env file
require('dotenv').config();

const { MongoClient } = require('mongodb');

// Retrieve the MongoDB URI from environment variables
const uri = process.env.MONGO_URI;

// Function to test MongoDB connection
async function testConnection() {
  const client = new MongoClient(uri);

  try {
    // Attempt to connect to the MongoDB server
    await client.connect();
    console.log('Connected successfully to MongoDB Atlas');
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    // Ensure the client is closed after the test
    await client.close();
  }
}

// Execute the test function
testConnection();
