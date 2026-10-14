require("dotenv").config();

const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  cors = require("cors");

const { db_user, db_pwd, db_host, db_name } = require("./config");

// MongoDB connection string
const mongoSrvString = `mongodb://127.0.0.1:27017/rozgar`;

// Connect the database
mongoose
  .connect(mongoSrvString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Couldn't connect to MongoDB, err: ", err);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Routes
const jobRoutes = require("./routes/job");
const userRoutes = require("./routes/user");

app.use("/jobs", jobRoutes);
app.use("/user", userRoutes);
app.use("/api/ai", require("./routes/ai"));
// Start server
const port = process.env.PORT || 3050;
app.listen(port, () => {
  console.log(`[OK] Server started on port ${port}`);
});
