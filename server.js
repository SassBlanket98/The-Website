require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static("public"));

// API endpoint to proxy GitHub repo requests
app.get("/api/repo/:owner/:repo", async (req, res) => {
  const { owner, repo } = req.params;
  try {
    // Use fetch to call GitHubs API (Node 18+ has fetch built-in)
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching repository data:", error);
    res.status(500).json({ error: "Error fetching repository data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
