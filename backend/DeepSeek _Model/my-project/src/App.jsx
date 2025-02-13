// src/App.jsx

import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to handle sending the user's query
  const sendQuery = async () => {
    setLoading(true);

    try {
      const requestBody = {
        query,
        sessionId,
      };

      // If sessionId doesn't exist, we make the initial request without it
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      // Store sessionId if it's the first request
      if (!sessionId) {
        setSessionId(data.sessionId);
      }

      // Update the chat history with the response
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: 'user', content: query },
        { role: 'assistant', content: data.response },
      ]);

      // Clear the query input after sending
      setQuery('');
    } catch (error) {
      console.error('Error sending query:', error);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">RagXOllama Chat</h1>

      <div className="chat-section mt-6 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Chat</h2>

        <div className="mb-4">
          <label htmlFor="query" className="block text-gray-600 mb-2">Query:</label>
          <input
            type="text"
            id="query"
            name="query"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ask me anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </div>

        <button
          onClick={sendQuery}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Fetching Response...' : 'Send'}
        </button>

        <div className="mt-4 p-4 bg-gray-50 border border-gray-300 rounded-md" id="chatResponse">
          {chatHistory.length === 0 ? (
            <p className="text-gray-600">Start a conversation by asking a question!</p>
          ) : (
            <div>
              {chatHistory.map((message, index) => (
                <div key={index} className={`mb-4 ${message.role === 'assistant' ? 'text-blue-600' : 'text-gray-800'}`}>
                  <strong>{message.role === 'assistant' ? 'Assistant' : 'You'}:</strong>
                  <p>{message.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
