// MongoDB Connection Test Script
// Run this with: node test-mongo.js

const mongoose = require("mongoose");

const MONGO_URL = "mongodb://127.0.0.1:27017/stayhub";

async function testMongoDB() {
  console.log("🔍 Testing MongoDB Connection...\n");
  
  try {
    // Test connection
    await mongoose.connect(MONGO_URL);
    console.log("✅ MongoDB Connected Successfully!");
    console.log("📍 Database: stayhub");
    console.log("📍 URL:", MONGO_URL);
    console.log("\n");

    // Check what collections exist
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("📊 Collections in database:");
    if (collections.length === 0) {
      console.log("   ⚠️  No collections found (database is empty)");
    } else {
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
    }
    console.log("\n");

    // Count documents in each collection
    for (const col of collections) {
      const count = await mongoose.connection.db.collection(col.name).countDocuments();
      console.log(`📈 ${col.name}: ${count} documents`);
    }

    // If users collection exists, show users
    if (collections.some(col => col.name === 'users')) {
      console.log("\n👥 Users in database:");
      const users = await mongoose.connection.db.collection('users').find({}).toArray();
      users.forEach(user => {
        console.log(`   - Username: ${user.username}`);
        console.log(`     Email: ${user.email}`);
        console.log(`     ID: ${user._id}`);
        console.log("");
      });
    }

    // If listings collection exists, show listings
    if (collections.some(col => col.name === 'listings')) {
      console.log("🏠 Listings in database:");
      const listings = await mongoose.connection.db.collection('listings').find({}).toArray();
      if (listings.length === 0) {
        console.log("   ⚠️  No listings found");
      } else {
        listings.forEach(listing => {
          console.log(`   - ${listing.title} (${listing.location})`);
        });
      }
    }

    console.log("\n✅ Test Complete!\n");
    
  } catch (error) {
    console.log("❌ MongoDB Connection Failed!");
    console.log("Error:", error.message);
    console.log("\n🔧 Troubleshooting:");
    console.log("1. Make sure MongoDB is running:");
    console.log("   Mac: brew services start mongodb-community");
    console.log("   Linux: sudo systemctl start mongod");
    console.log("   Windows: Start MongoDB service\n");
    console.log("2. Check if MongoDB is listening on port 27017");
    console.log("3. Try connecting with: mongo or mongosh\n");
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Connection closed.");
  }
}

testMongoDB();
