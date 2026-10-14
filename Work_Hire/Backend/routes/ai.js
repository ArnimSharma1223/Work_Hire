const router = require("express").Router();
const { chatBot } = require("../controllers/ai");

router.post("/chat", chatBot);

module.exports = router;