import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = 5000;

// Set up Express middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // Allow frontend to communicate with backend

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Create a route to handle the user message
app.post("/chat", async (req, res) => {
  const { userMessage, metrics } = req.body; // Extract userMessage and metrics

  console.log("Received user message:", userMessage); // Debugging
  console.log("Received metrics:", metrics); // Debugging

  try {
    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    let prompt = userMessage;

    // Use metrics to customize the prompt
    if (metrics) {
      if (metrics.mood !== null) {
        prompt += `\n\nUser's mood: ${metrics.mood}/10`;
      }
      if (metrics.stress !== null) {
        prompt += `\n\nUser's stress level: ${metrics.stress}/10`;
      }
      if (metrics.sleep !== null) {
        prompt += `\n\nUser's sleep quality: ${metrics.sleep}`;
      }
    }

    console.log("Sending prompt to AI:", prompt); // Debugging

    // Send the prompt to the Google AI API
    const result = await chat.sendMessageStream(prompt);

    let aiResponse = "";
    for await (const chunk of result.stream) {
      const chunkText = await chunk.text();
      aiResponse += chunkText;
    }

    console.log("AI response:", aiResponse); // Debugging

    // Wrap the AI response in HTML tags
    const htmlResponse = `
      <html>
        <head>
          <title>AI Response</title>
        </head>
        <body>
          <div>
            <p>${aiResponse}</p>
          </div>
        </body>
      </html>
    `;

    // Return the HTML wrapped response to the frontend
    res.json({ message: htmlResponse });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
