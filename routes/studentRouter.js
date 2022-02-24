const express = require("express");
const db = require("../db/db");
const studentsRouter = express.Router();

// getting all students
studentsRouter.route("/").get(async (req, res) => {
  try {
    const students = await db("student");
    res.status(201).json({ students });
  } catch (err) {
    res.send({ msg: err.message });
  }
});

// posting/inserting a student record
studentsRouter.route("/").post(async (req, res) => {
  try {
    await db("student")
      .insert({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
      })
      .then((data) => {
        res.status(201).json({ success: true, message: "Record Inserted" });
      });
  } catch (err) {
    res.send({ msg: err.message });
  }
});

// updating a student record
studentsRouter.route("/:id").put(async (req, res) => {
  try {
    await db("student")
      .where("id", req.params.id)
      .update({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
      })
      .then((data) => {
        res.status(201).json({ success: true, message: "Record updated!" });
      });
  } catch (err) {
    res.send({ message: err.message });
  }
});

// getting a student data by passing id
studentsRouter.route("/:id").get(async (req, res) => {
  const student = await db("student").where("id", req.params.id);
  if (student.length>0) {
    res.send({ student });
  }
  else{
    res.send({ message: "Student Not Found." });
  }
});

// deleting a student record
studentsRouter.route("/:id").delete(async (req, res) => {
  try {
    await db("student")
      .where("id", req.params.id)
      .del()
      .then((data) => {
        res.status(201).json({ success: true, message: "Record Deleted!" });
      });
  } catch (err) {
    res.send({ msg: err.message });
  }
});

module.exports = studentsRouter;
