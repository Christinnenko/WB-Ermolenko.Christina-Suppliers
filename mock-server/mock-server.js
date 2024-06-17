const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 5001;

// Middleware для парсинга JSON тела запроса
app.use(bodyParser.json());

// Middleware для CORS
app.use(cors());

// Путь к директории с данными
const dataDir = path.join(__dirname, "../data");

// Функция для получения массива из файла
const getDataFromFile = (fileName) => {
  const filePath = path.join(dataDir, fileName);
  const fileContent = fs.readFileSync(filePath, "utf8");

  let data;
  try {
    data = JSON.parse(fileContent);
  } catch (err) {
    console.error(`Error parsing ${fileName}:`, err);
    throw new Error(`Failed to parse ${fileName}`);
  }

  if (!Array.isArray(data)) {
    console.error(`${fileName} does not contain an array.`);
    throw new Error(`${fileName} is not an array.`);
  }

  return data;
};

// Маршрут для получения статусов
app.get("/api/statuses", (req, res) => {
  try {
    const data = getDataFromFile("statuses.json");
    res.json(data);
  } catch (err) {
    console.error("Error reading statuses file:", err);
    res.status(500).json({ error: "Failed to read statuses file" });
  }
});

// Маршрут для получения городов
app.get("/api/cities", (req, res) => {
  try {
    const data = getDataFromFile("cities.json");
    res.json(data);
  } catch (err) {
    console.error("Error reading cities file:", err);
    res.status(500).json({ error: "Failed to read cities file" });
  }
});

// Маршрут для получения типов поставок
app.get("/api/supplyTypes", (req, res) => {
  try {
    const data = getDataFromFile("supplyTypes.json");
    res.json(data);
  } catch (err) {
    console.error("Error reading supply types file:", err);
    res.status(500).json({ error: "Failed to read supply types file" });
  }
});

// Маршрут для получения складов
app.get("/api/warehouses", (req, res) => {
  try {
    const data = getDataFromFile("warehouses.json");
    res.json(data);
  } catch (err) {
    console.error("Error reading warehouses file:", err);
    res.status(500).json({ error: "Failed to read warehouses file" });
  }
});

// Маршрут для получения всех поставок
app.get("/api/supplies", (req, res) => {
  try {
    const data = getDataFromFile("supplies.json");
    res.json(data);
  } catch (err) {
    console.error("Error reading supplies:", err);
    res.status(500).json({ error: "Failed to read supplies" });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Mock server is running on http://localhost:${port}`);
});
