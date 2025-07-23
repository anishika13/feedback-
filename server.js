const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const feedbackRoutes = require("./routes/feedback");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());      // For parsing JSON
app.use(express.json());         // ✅ Important for fetch JSON body
app.use(express.static("public")); // Serve frontend files from /public

// Routes
app.use("/api/feedback", feedbackRoutes);

// Serve index.html for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/feedbackDB")
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
