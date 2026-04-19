const db = require("../config/db");

// CREATE
exports.createTask = (req, res) => {
  const { title, description } = req.body;

  const sql = "INSERT INTO tasks (title, description) VALUES (?, ?)";

  db.query(sql, [title, description], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({
      message: "Task created",
      taskId: result.insertId,
    });
  });
};

// READ ALL
exports.getTasks = (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(result);
  });
};

// READ ONE
exports.getTaskById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM tasks WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(result[0]);
  });
};

// UPDATE
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const sql = `
    UPDATE tasks 
    SET title = ?, description = ?, status = ?
    WHERE id = ?
  `;

  db.query(sql, [title, description, status, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: "Task updated" });
  });
};

// DELETE
exports.deleteTask = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM tasks WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: "Task deleted" });
  });
};
