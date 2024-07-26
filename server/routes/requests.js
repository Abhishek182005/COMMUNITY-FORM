const express = require("express");
const router = express.Router();
const Request = require("../models/Request");

// Create a new request
router.post("/", async (req, res) => {
  try {
    const { residentName, residentAddress, content, status } = req.body;
    const newRequest = new Request({ residentName, residentAddress, content, status });
    const savedRequest = await newRequest.save();
    res.json(savedRequest);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all requests
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Like a request
router.patch("/:id/like", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 }, updatedAt: Date.now() },
      { new: true }
    );
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update request status
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a request
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Request.findByIdAndDelete(id);
    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
