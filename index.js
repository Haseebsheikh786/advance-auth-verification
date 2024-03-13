const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const port = process.env.PORT || 8000;

app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json());

app.use(morgan("default"));
app.use(express.static(path.resolve(__dirname, "build")));

app.use(errorHandler); 

app.use("/", require("./Routes/UserRoutes"));

connectDb();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
