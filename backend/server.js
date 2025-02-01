import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
const port = 5000;

// Set up Express middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // Allow frontend to communicate with backend

// MongoDB connection
mongoose.connect('mongodb+srv://efty3222:12345@user-service.ooe8u.mongodb.net/?retryWrites=true&w=majority&appName=user-service', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Sign-up route
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  res.status(201).send('User created successfully');
});

// Sign-in route
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Invalid credentials');
  }

  res.status(200).send('Login successful');
});

// Chat route
app.post("/chat", async (req, res) => {
  const { userMessage, metrics } = req.body;

  console.log("Received user message:", userMessage);
  console.log("Received metrics:", metrics);

  try {
    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    let prompt = userMessage;

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

    console.log("Sending prompt to AI:", prompt);

    const result = await chat.sendMessageStream(prompt);

    let aiResponse = "";
    for await (const chunk of result.stream) {
      const chunkText = await chunk.text();
      aiResponse += chunkText;
    }

    console.log("AI response:", aiResponse);

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