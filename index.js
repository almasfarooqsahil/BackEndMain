const express = require('express');
const app = express()
const port = 5000
const cors = require('cors')
const bodyParser = require('body-parser')
const studentsRoute = require("./routes/studentRouter")
const booksRoute = require("./routes/bookRouter")


app.use(express.json({limit: "30mb",extended:true}));
app.use(cors())
app.use(bodyParser.json());
// routes for student and books
app.use("/students", studentsRoute);
app.use("/books", booksRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})