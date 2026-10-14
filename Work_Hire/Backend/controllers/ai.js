const generateAIResponse = require("../services/ai");

exports.chatBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required"
      });
    }

    const reply = await generateAIResponse(message);

    return res.json({
      reply
    });

  } catch (error) {
    console.error("AI ERROR:", error);

    return res.status(500).json({
      message: "AI controller failed"
    });
  }
};