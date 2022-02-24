const express = require("express");
const db = require("../db/db");
const booksRouter = express.Router();

// getting all books list
booksRouter.route("/").get(async (req, res) => {
  try {
    const books = await db("book");
    res.status(201).json({ books });
  } catch (err) {
    res.send({ msg: err.message });
  }
});

// posting/inserting a book record
booksRouter.route("/").post(async (req, res) => {
  try {
    await db("book")
      .insert({
        book_name: req.body.bookName,
        author_name: req.body.authorName,
        borrowed_by: req.body.student_id,
        date_borrowed: req.body.dateBorrowed,
        date_return: req.body.expectedReturn,
      })
      .then((data) => {
        res.status(201).json({ success: true, message: "Record Inserted" });
      });
  } catch (err) {
    res.send({ msg: err.message });
  }
});

// updating a book record
booksRouter.route("/:id").put(async (req, res) => {
  try {
    await db("book")
      .where("id", req.params.id)
      .update({
        book_name: req.body.bookName,
        author_name: req.body.authorName,
        borrowed_by: req.body.student_id,
        date_borrowed: req.body.dateBorrowed,
        date_return: req.body.expectedReturn,
      })
      .then((data) => {
        res.status(201).json({ success: true, message: "Record updated!" });
      });
  } catch (err) {
    res.send({ message: err.message });
  }
});

// deleting a book record
booksRouter.route("/:id").delete(async (req, res) => {
  try {
    await db("book")
      .where("id", req.params.id)
      .del()
      .then((data) => {
        res.status(201).json({ success: true, message: "Record Deleted!" });
      });
  } catch (err) {
    res.send({ msg: err.message });
  }
});

// getting the student name with books (joining both tables)
booksRouter.get("/students-books", async (req, res) => {
  try {
    const booksdata = await db
      .select(
        "book.id",
        "book.book_name",
        "book.author_name",
        "student.first_name",
        "student.last_name",
        "book.date_borrowed",
        "book.date_return"
      )
      .from("book")
      .leftOuterJoin("student", function () {
        this.on("student.id", "=", "book.borrowed_by");
      });
    res.status(201).send({ booksdata });
  } catch (err) {
    res.send({ msg: err.message });
  }
});

booksRouter.get("/students-books/:id", async (req, res) => {
  try {
    const book = await db
      .select(
        "book.id",
        "book.book_name",
        "book.author_name",
        "student.first_name",
        "student.last_name",
        "book.date_borrowed",
        "book.date_return"
      )
      .from("book").where("book.id", req.params.id)
      .leftOuterJoin("student", function () {
        this.on("student.id", "=", "book.borrowed_by");
      });
    res.status(201).send({ book });
  } catch (err) {
    res.send({ msg: err.message });
  }
});

// getting a book data by passing id
booksRouter.route("/:id").get(async (req, res) => {
  const book = await db("book").where("id", req.params.id);
  if (book.length>0) {
    res.send({ book });
  }
  else{
    res.send({ message: "Book Not Found." });
  }
});

module.exports = booksRouter;
