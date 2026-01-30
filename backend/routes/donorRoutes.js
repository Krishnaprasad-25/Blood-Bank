const express = require("express");
const router = express.Router();

// ✅ CORRECT PATH
const db = require("../config/db");

//get all donors
router.get("/", (req, res) => {
  const sql = "SELECT * FROM donors";

  db.query(sql, (err, results) => {
    if (err) {
      console.log("DB FETCH ERROR:", err);
      return res.status(500).json({ message: "DB Error" });
    }
    res.json(results);
  });
  });

/* ADD DONOR */
router.post("/", (req, res) => {
  const { donorName, age, gender, contact, branch, blood } = req.body;

  const sql = `
    INSERT INTO donors 
    (donorName, age, gender, contact, branch, blood)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [donorName, age, gender, contact, branch, blood],
    (err, result) => {
      if (err) {
        console.log("DB INSERT ERROR:", err);
        return res.status(500).json({ message: "DB Error" });
      }
      res.json({ message: "Donor stored in DB", id: result.insertId });
    }
  );
});
//delete donor by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM donors WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("DB DELETE ERROR:", err);
      return res.status(500).json({ message: "DB Error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.json({ message: "Donor deleted successfully" });
  });
});

module.exports = router;
