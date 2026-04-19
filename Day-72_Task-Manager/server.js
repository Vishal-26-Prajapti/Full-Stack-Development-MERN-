require("dotenv").config();
require("./config/db");

const express = require("express");
const cors = require("cors"); 
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const taskRoutes = require("./routes/taskRoutes");
const logger = require("./middleware/logger");

app.use(logger);
app.use("/tasks", taskRoutes);

app.get("/api", (req, res) => {
  res.send("API running...");
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err); // log error

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

// server start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
