var express = require('express');
var router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/generate-explanation", async (req, res) => {
  const { question } = req.body;

  if (!question) {
      return res.status(400).json({ error: "Question is required" });
  }

  try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent([question]);
      res.json({ explanation: result.response.text() });
  } catch (error) {
      console.error("Error generating explanation:", error);
      res.status(500).json({ error: "Error generating content" });
  }
});
module.exports = router;
