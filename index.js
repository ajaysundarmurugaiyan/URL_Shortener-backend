// URL Shortener Backend Implementation
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { nanoid } = require('nanoid');

const app = express();
const allowedOrigins = [
  'https://url-shortner-pink-nine.vercel.app', // your Vercel frontend URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // set to true if you need cookies/auth, otherwise can remove
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// URL Schema and Model
const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
});
const Url = mongoose.model('Url', urlSchema);

// POST /api/shorten - Create a short URL
app.post('/api/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  // Basic URL validation
  if (!originalUrl || !/^https?:\/\//i.test(originalUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  try {
    // Check for duplicate
    let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${url.shortId}` });
    }
    // Generate unique shortId
    let shortId;
    let exists = true;
    while (exists) {
      shortId = nanoid(7);
      exists = await Url.findOne({ shortId });
    }
    url = new Url({ originalUrl, shortId });
    await url.save();
    res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortId}` });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /:shortId - Redirect to original URL
app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  try {
    const url = await Url.findOne({ shortId });
    if (url) {
      url.clicks++;
      await url.save();
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ error: 'Short URL not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
