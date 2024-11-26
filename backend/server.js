const express = require("express");
const path = require("path");
const connectDB = require("./config");
const { addSchedule, getSchedules } = require("./database");

// Initialize Express
const app = express();
connectDB();

// Middleware
app.use(express.json()); // Parse JSON data
app.use(express.static(path.join(__dirname, "../public"))); // Serve static files from public folder

// API Routes
app.post("/api/schedules", async (req, res) => {
  try {
    const schedule = await addSchedule(req.body);
    res.status(201).json(schedule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/schedules", async (req, res) => {
  try {
    const schedules = await getSchedules();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
