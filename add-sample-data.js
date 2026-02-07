// Add Sample Data Script
// This creates a test user and sample listings
// Run this with: node add-sample-data.js

const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const User = require("./models/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/stayhub";

const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Goa",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [73.8278, 15.4909]
    }
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "Mumbai",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [72.8777, 19.0760]
    }
  },
  {
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Manali",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [77.1892, 32.2432]
    }
  },
  {
    title: "Historic Villa in Rajasthan",
    description: "Experience the charm of Rajasthan in this beautifully restored historic villa.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Jaipur",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [75.7873, 26.9124]
    }
  },
  {
    title: "Lakeside Cottage",
    description: "Relax by the tranquil lake in this cozy cottage. Perfect for fishing and boating enthusiasts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1300,
    location: "Nainital",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [79.4633, 29.3803]
    }
  }
];

async function addSampleData() {
  console.log("🚀 Starting to add sample data...\n");
  
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to MongoDB");

    // Check if user "Nidhi" already exists
    let user = await User.findOne({ username: "Nidhi" });
    
    if (!user) {
      console.log("👤 Creating demo user...");
      // Create a demo user
      const newUser = new User({
        email: "demo@stayhub.com",
        username: "DemoUser"
      });
      user = await User.register(newUser, "password123");
      console.log("✅ Demo user created!");
      console.log(`   Username: DemoUser`);
      console.log(`   Password: password123`);
      console.log(`   ID: ${user._id}\n`);
    } else {
      console.log("✅ Using existing user: Nidhi");
      console.log(`   ID: ${user._id}\n`);
    }

    // Delete existing listings
    await Listing.deleteMany({});
    console.log("🗑️  Cleared existing listings\n");

    // Add sample listings
    console.log("🏠 Adding sample listings...");
    const listingsWithOwner = sampleListings.map(listing => ({
      ...listing,
      owner: user._id
    }));

    await Listing.insertMany(listingsWithOwner);
    console.log(`✅ Added ${sampleListings.length} sample listings!\n`);

    // Show what was added
    console.log("📋 Sample listings added:");
    sampleListings.forEach((listing, index) => {
      console.log(`   ${index + 1}. ${listing.title} - ${listing.location} (₹${listing.price}/night)`);
    });

    console.log("\n✅ All done! You can now:");
    console.log("   1. Run: npm start");
    console.log("   2. Visit: http://localhost:8080");
    console.log("   3. You should see 5 listings!\n");

  } catch (error) {
    console.log("❌ Error:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Connection closed.");
  }
}

addSampleData();
