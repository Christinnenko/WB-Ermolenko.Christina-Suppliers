const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const dataFilePath = path.join(__dirname, "data.json");

app.get("/api/data", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
    res.json(data);
  } catch (err) {
    console.error("Error reading data file:", err);
    res.status(500).json({ error: "Failed to read data file" });
  }
});

app.put("/api/data", (req, res) => {
  try {
    const newData = req.body;
    fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2));
    res.json({ message: "Data updated successfully" });
  } catch (err) {
    console.error("Error updating data file:", err);
    res.status(500).json({ error: "Failed to update data file" });
  }
});

app.listen(port, () => {
  console.log(`Mock server is running on http://localhost:${port}`);
});
