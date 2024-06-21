const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const crypto = require("crypto");

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
    console.error(`${fileName} не содержит массив.`);
    throw new Error(`${fileName} не является массивом.`);
  }

  return data;
};

// Маршрут для получения статусов
app.get("/api/statuses", (req, res) => {
  try {
    const data = getDataFromFile("statuses.json");
    res.json(data);
  } catch (err) {
    console.error("Ошибка при чтении файла со статусами:", err);
    res.status(500).json({ error: "Не удалось прочитать файл со статусами" });
  }
});

// Маршрут для получения городов
app.get("/api/cities", (req, res) => {
  try {
    const data = getDataFromFile("cities.json");
    res.json(data);
  } catch (err) {
    console.error("Ошибка при чтении файла с городами:", err);
    res.status(500).json({ error: "Не удалось прочитать файл с городами" });
  }
});

// Маршрут для получения типов поставок
app.get("/api/supplyTypes", (req, res) => {
  try {
    const data = getDataFromFile("supplyTypes.json");
    res.json(data);
  } catch (err) {
    console.error("Ошибка при чтении файла с типами поставок:", err);
    res
      .status(500)
      .json({ error: "Не удалось прочитать файл с типами поставок" });
  }
});

// Маршрут для получения складов
app.get("/api/warehouses", (req, res) => {
  try {
    const data = getDataFromFile("warehouses.json");
    res.json(data);
  } catch (err) {
    console.error("Ошибка при чтении файла со складами:", err);
    res.status(500).json({ error: "Не удалось прочитать файл со складами" });
  }
});

// Маршрут для получения всех поставок
app.get("/api/supplies", (req, res) => {
  try {
    const data = getDataFromFile("supplies.json");
    res.json(data);
  } catch (err) {
    console.error("Ошибка при чтении поставок:", err);
    res.status(500).json({ error: "Не удалось прочитать поставки" });
  }
});

// Маршрут для добавления новой поставки
app.post("/api/supplies", (req, res) => {
  try {
    const supplies = getDataFromFile("supplies.json");
    const uniqId = crypto.randomUUID();
    const newSupply = { ...req.body, id: uniqId };
    supplies.push(newSupply);
    saveSuppliesToFile(supplies);
    res.json({ message: "Supply added successfully", supply: newSupply });
  } catch (err) {
    console.error("Ошибка при добавлении поставки:", err);
    res.status(500).json({ error: "Не удалось добавить поставку" });
  }
});

// Маршрут для редактирования поставки
app.put("/api/supplies/:id", (req, res) => {
  try {
    const supplyId = req.params.id;
    const supplies = getDataFromFile("supplies.json");
    const index = supplies.findIndex((supply) => supply.id === supplyId);

    if (index !== -1) {
      const currentSupply = supplies[index];

      const updatedSupply = {
        ...currentSupply,
        ...req.body,
        id: currentSupply.id,
      };

      supplies[index] = updatedSupply;
      saveSuppliesToFile(supplies);

      res.json({
        message: `Поставка с ID ${supplyId} успешно обновлена`,
        updatedSupply,
      });
    } else {
      res.status(404).json({ error: `Поставка с ID ${supplyId} не найдена` });
    }
  } catch (err) {
    console.error("Ошибка при обновлении поставки:", err);
    res.status(500).json({ error: "Не удалось обновить поставку" });
  }
});

// Маршрут для удаления поставки
app.delete("/api/supplies/:id", (req, res) => {
  try {
    const supplyId = req.params.id;
    const supplies = getDataFromFile("supplies.json");
    const index = supplies.findIndex((supply) => supply.id === supplyId);
    if (index !== -1) {
      supplies.splice(index, 1);
      saveSuppliesToFile(supplies);
      res.json({ message: `Поставка с ID ${supplyId} успешно удалена` });
    } else {
      res.status(404).json({ error: `Поставка с ID ${supplyId} не найдена` });
    }
  } catch (err) {
    console.error("Ошибка при удалении поставки:", err);
    res.status(500).json({ error: "Не удалось удалить поставку" });
  }
});

// Функция для сохранения данных о поставках в файл
function saveSuppliesToFile(supplies) {
  const filePath = path.join(dataDir, "supplies.json");
  fs.writeFile(filePath, JSON.stringify(supplies, null, 2), (err) => {
    if (err) {
      console.error("Ошибка при сохранении поставок в файле:", err);
    }
  });
}

// Запуск сервера
app.listen(port, () => {
  console.log(`Мок-сервер запущен по адресу http://localhost:${port}`);
});
