const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/itemdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// MongoDB Schema
const itemSchema = new mongoose.Schema({
  name: String,
  type: String,
  desc: String,
  cover: String,
  images: [String],
});
const Item = mongoose.model("Item", itemSchema);

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// File Upload Setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  }
});
const upload = multer({ storage });

// Routes
app.get("/api/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post("/api/items", upload.fields([{ name: "cover" }, { name: "images" }]), async (req, res) => {
  const { name, type, desc } = req.body;
  const cover = req.files.cover[0].path;
  const images = req.files.images?.map(f => f.path) || [];

  const newItem = new Item({ name, type, desc, cover, images });
  await newItem.save();
  res.json(newItem);
});

// Start server
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
