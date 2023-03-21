const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const scaleAPIUrl = process.env.SCALE_API_URL;
const scaleAPIAuthorization = process.env.SCALE_API_AUTHORIZATION;

app.post("/api/scaleai", async (req, res) => {
  try {
    const text = req.body.text;
    const fetch = await import("node-fetch").then((module) => module.default);
    const response = await fetch(scaleAPIUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: scaleAPIAuthorization,
      },
      body: JSON.stringify({ input: { text: text } }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Set server timeout to 5 minutes (5 * 60 * 1000 ms)
server.timeout = 5 * 60 * 1000;