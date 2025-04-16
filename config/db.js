require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB connected!");

    // Example: get a reference to your collection
    const db = client.db(); // defaults to db name from URI
    const usersCollection = db.collection("users");

    // Example usage
    const users = await usersCollection.find().toArray();
    console.log(users);

    // Don't forget to close when done (or keep it open if you're using elsewhere)
    // await client.close();

  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}

connectDB();
