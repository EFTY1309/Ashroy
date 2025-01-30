import  { useState } from 'react';
import { Send, User2, Bot } from 'lucide-react';
import FloatingStarsBackground from '../components/FloatingStarsBackground';

const FloatingElement = ({ delay = "0s", duration = "3s", children }) => (
  <div
    className="animate-float"
    style={{
      animation: `float ${duration} ease-in-out infinite`,
      animationDelay: delay,
    }}
  >
    {children}
  </div>
);

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m Ashroy, your mental health companion. How can I help you today?' }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, { type: 'user', text: message }]);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 relative overflow-hidden">
      {/* Floating Stars Background */}
      <FloatingStarsBackground />

      {/* Nebula Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-10" />
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-5" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-400 rounded-full blur-3xl opacity-10" />
      </div>

      {/* Header */}
      <div className="relative backdrop-blur-md bg-white/10 border-b border-white/10 p-4 flex items-center justify-center z-10">
        <FloatingElement duration="3s">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-white">Chat with Ashroy</h1>
          </div>
        </FloatingElement>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-slideIn`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className={`flex items-start space-x-3 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <FloatingElement duration="3s">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg
                    ${msg.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-400 to-blue-500' 
                      : 'bg-white/20'}`}
                  >
                    {msg.type === 'user' ? (
                      <User2 className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                </FloatingElement>
                <div
                  className={`rounded-2xl px-4 py-2 shadow-lg backdrop-blur-sm
                    ${msg.type === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none'
                      : 'bg-white/10 text-white rounded-tl-none'
                    }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="relative p-4 backdrop-blur-md bg-white/10 border-t border-white/10 z-10">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-900 shadow-lg transition-all duration-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ChatPage;