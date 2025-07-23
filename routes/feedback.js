const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// POST /api/feedback — Submit feedback
router.post("/", async (req, res) => {
  console.log("👉 Incoming feedback:", req.body);

  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const feedback = new Feedback({ name, email, message });
    await feedback.save();

    console.log("✅ Feedback saved successfully");
    res.status(201).json({ message: "Feedback submitted successfully" });

  } catch (error) {
    console.error("❌ Error saving feedback:", error.message);
    res.status(400).json({ error: "Failed to save feedback" });
  }
});

// GET /api/feedback — Fetch all feedbacks (admin page)
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ _id: -1 }); // Latest first
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("❌ Error fetching feedbacks:", error.message);
    res.status(500).json({ error: "Failed to fetch feedbacks" });
  }
});

module.exports = router;
