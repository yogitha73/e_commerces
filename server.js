const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Assuming you have this file for DB connection
connectDB();
const app = express();

// Load environment variables
dotenv.config();

// Use CORS with specific settings
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"], // React frontend origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // Allow cookies (if needed)
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS globally
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public',express.static("public"));

// Connect to MongoDB (Make sure the `connectDB` function is correct)
connectDB();

// Routes
app.use('/api/items', require("./routes/items"));
app.use('/api/payment', require("./routes/payment"));

// Start server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
