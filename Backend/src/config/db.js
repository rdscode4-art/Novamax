const mongoose = require('mongoose');
const dns = require('dns');

// Use Google DNS to resolve SRV records (fixes ECONNREFUSED on some networks)
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async (retries = 5) => {
  const options = {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 30000,
    retryWrites: true,
    family: 4, // Force IPv4
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🔄 MongoDB connection attempt ${attempt}/${retries}...`);
      const conn = await mongoose.connect(process.env.MONGODB_URI, options);
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed: ${error.message}`);
      if (attempt === retries) {
        console.error('💡 Possible fixes:');
        console.error('   1. Go to MongoDB Atlas → Network Access → Add IP: 0.0.0.0/0');
        console.error('   2. Check your internet connection');
        console.error('   3. Verify MONGODB_URI in .env file');
        process.exit(1);
      }
      // Wait before retrying (exponential backoff)
      const waitTime = attempt * 3000;
      console.log(`⏳ Retrying in ${waitTime / 1000}s...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
};

module.exports = connectDB;
