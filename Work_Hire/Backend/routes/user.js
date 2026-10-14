const express = require("express");
const methodOverride = require("method-override");
const router = express.Router();

const { createUser } = require("../controllers/user");

// Middleware
router.use(methodOverride("_method"));

// Routes
router.post("/register", createUser);

module.exports = router;
