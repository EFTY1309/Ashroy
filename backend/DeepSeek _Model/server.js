import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { ChromaClient, DefaultEmbeddingFunction } from 'chromadb';
import { Ollama } from 'ollama';
import { addFilesToCollection } from './data_loader.js';

const app = express();
const port = 3000;

const ollama = new Ollama({ host: process.env.OLLAMA_URL || 'http://localhost:11434' });
const client = new ChromaClient({
  path: process.env.CHROMA_URL || 'http://localhost:8000'
});
const emb_fn = new DefaultEmbeddingFunction();

await fillDB();

const statusm = await ollama.pull({ model: 'deepseek-r1:1.5b' });
console.log(statusm);

app.use(express.static('public'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/uploadFiles', async (req, res) => {
  const { filePath } = req.body;
  const collection = await getOrCreateCollection('News');
  await addFilesToCollection(filePath, collection);
  res.send({ message: 'Files added to database successfully' });
});

const sessionData = {}; // To track conversation history by session ID

// Helper function to create a new session ID
function generateSessionId() {
  return Math.random().toString(36).substring(2, 15);
}

app.post('/chat', async (req, res) => {
  let { query, sessionId } = req.body;

  // If sessionId is not provided, generate a new one
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionData[sessionId] = []; // Initialize conversation history for the new session
  }

  console.log(`Session ID: ${sessionId} - Query received: ${query}`);

  // Retrieve previous conversation history for the session
  const conversationHistory = sessionData[sessionId];

  // Add user's query to the session history
  conversationHistory.push({ role: 'user', content: query });

  // Retrieve context using Chroma
  const collection = await getOrCreateCollection('News');
  const dbres = await queryCollection(collection, 5, [query]);
  const context = dbres.documents[0];

  // Construct the final query including conversation history and new context
  const finalQuery = `Using the following context, answer the user's query. If unsure, say you don't know.\nContext: ${context}\nConversation History:\n${conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}\nUser's Question: ${query}\nAssistant's Answer:`;

  console.log(finalQuery);

  // Send the query to Ollama and get the response
  const response = await ollama.chat({
    model: 'deepseek-r1:1.5b',
    messages: [{ role: 'user', content: finalQuery }],
  });

  // Add assistant's response to the session history
  conversationHistory.push({ role: 'assistant', content: response.message.content });

  // Send the response back to the user
  res.send({ sessionId, response: response.message.content });
});

async function getOrCreateCollection(name) {
  const collection = await client.getOrCreateCollection({
    name,
    metadata: {
      description: 'Private Docs',
      'hnsw:space': 'l2',
    },
    embeddingFunction: emb_fn,
  });
  return collection;
}

async function queryCollection(collection, nResults, queryTexts) {
  const results = await collection.query({
    nResults,
    queryTexts,
  });
  return results;
}

async function fillDB(retryCount = 5, delay = 5000) {
  try {
    const collection = await getOrCreateCollection('News');
    const pdfPath = 'Docs/';
    await addFilesToCollection(pdfPath, collection);
    console.log('Documents ingested successfully!');
  } catch (error) {
    console.error('Error filling DB:', error.message);
    if (retryCount > 0) {
      console.log(`Retrying in ${delay / 1000} seconds...`);
      await sleep(delay);
      await fillDB(retryCount - 1, delay);
    } else {
      console.error('Max retries reached. Failed to fill DB.');
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
