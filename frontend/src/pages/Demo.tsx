import { useState } from 'react';
import { Send, User2, Bot, Heart, Moon, Activity } from 'lucide-react';
import FloatingStarsBackground from '../components/FloatingStarsBackground';

interface Message {
  type: 'user' | 'bot';
  text: string;
  showMoodInput?: boolean;
  showStressInput?: boolean;
  showSleepButtons?: boolean;
  showQuickReplies?: boolean;
}

interface Metrics {
  mood: number | null;
  stress: number | null;
  sleep: string | null;
}

const specializedBots = [
  {
    id: 'anxiety',
    name: 'Anxiety Management Bot',
    icon: '🧘‍♂️',
    description: 'Helps you manage anxiety through guided exercises and tips.',
  },
  {
    id: 'stress',
    name: 'Stress Reduction Bot',
    icon: '🌿',
    description: 'Provides techniques to reduce stress and improve relaxation.',
  },
  {
    id: 'depression',
    name: 'Coping with Depression Bot',
    icon: '🤗',
    description: 'Offers support and strategies for coping with depression.',
  },
  {
    id: 'mindfulness',
    name: 'Mindfulness Bot',
    icon: '🧠',
    description: 'Guides you through mindfulness exercises and meditation.',
  },
  {
    id: 'sleep',
    name: 'Sleep Improvement Bot',
    icon: '🌙',
    description: 'Helps you improve your sleep quality with tips and routines.',
  },
  {
    id: 'self-care',
    name: 'Self-Care Bot',
    icon: '💖',
    description: 'Encourages self-care practices for mental and physical well-being.',
  },
];

const FloatingElement: React.FC<{
  delay?: string;
  duration?: string;
  children: React.ReactNode;
}> = ({ delay = '0s', duration = '3s', children }) => (
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
  const [message, setMessage] = useState<string>('');
  const [onboarding, setOnboarding] = useState<boolean>(true);
  const [metrics, setMetrics] = useState<Metrics>({
    mood: null,
    stress: null,
    sleep: null,
  });
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      text: "Hi! I'm Ashroy, your personal mental health companion. How are you feeling today? (Please rate from 1-10)",
      showMoodInput: true,
    },
  ]);

  const handleMoodSubmit = (value: number) => {
    setMetrics((prev) => ({ ...prev, mood: value }));
    setMessages((prev) => [
      ...prev,
      { type: 'user', text: `My mood is ${value}/10` },
      {
        type: 'bot',
        text: 'How stressed are you feeling today? (1-10)',
        showStressInput: true,
      },
    ]);
  };

  const handleStressSubmit = (value: number) => {
    setMetrics((prev) => ({ ...prev, stress: value }));
    setMessages((prev) => [
      ...prev,
      { type: 'user', text: `My stress level is ${value}/10` },
      {
        type: 'bot',
        text: 'How well did you sleep last night?',
        showSleepButtons: true,
      },
    ]);
  };

  const handleSleepSubmit = (value: string) => {
    setMetrics((prev) => ({ ...prev, sleep: value }));
    setMessages((prev) => [
      ...prev,
      { type: 'user', text: `My sleep quality was ${value}` },
      {
        type: 'bot',
        text: "Thank you for sharing. I'm here to support you. What would you like to talk about?",
      },
    ]);
    setOnboarding(false);
  };

  const handleBotResponse = (message: string): Message | null => {
    const botKeyword = message.toLowerCase();
    const selectedBot = specializedBots.find((bot) =>
      botKeyword.includes(bot.id)
    );
  
    if (selectedBot) {
      // Ensure the bot response contains the correct type: 'bot'
      switch (selectedBot.id) {
        case 'anxiety':
          return {
            type: 'bot',
            text: 'Let’s try a grounding exercise for anxiety. Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.',
          };
        case 'stress':
          return {
            type: 'bot',
            text: 'Here’s a quick stress relief technique: Take a deep breath in for 4 seconds, hold for 4 seconds, and exhale for 6 seconds. Repeat 5 times.',
          };
        // Other cases...
        default:
          return {
            type: 'bot',
            text: "I'm here to help. What would you like to talk about?",
          };
      }
    }
    return null;
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Ensure the user message is valid
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'user', text: message },
      ]);
  
      // Handle bot response
      const botResponse = handleBotResponse(message);
      if (botResponse) {
        setTimeout(() => {
          // Ensure the bot response message is valid
          setMessages((prevMessages) => [
            ...prevMessages,
            botResponse, // Make sure botResponse is a valid Message type
          ]);
        }, 1000);
      }
  
      setMessage('');
    }
  };
  

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 relative overflow-hidden">
      <FloatingStarsBackground />

      {/* Nebula Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-10" />
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-5" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-400 rounded-full blur-3xl opacity-10" />
      </div>

      {/* Header */}
      <div className="relative backdrop-blur-md bg-white/10 border-b border-white/10 p-4 flex items-center justify-between z-10">
        <FloatingElement duration="3s">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-white">Chat with Ashroy</h1>
          </div>
        </FloatingElement>
        {!onboarding && metrics.mood && (
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2 text-white/80">
              <Heart className="w-4 h-4" />
              <span>Mood: {metrics.mood}/10</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <Moon className="w-4 h-4" />
              <span>Sleep: {metrics.sleep}</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <Activity className="w-4 h-4" />
              <span>Stress: {metrics.stress}/10</span>
            </div>
          </div>
        )}
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
              <div
                className={`flex items-start space-x-3 max-w-[80%] ${
                  msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <FloatingElement duration="3s">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-blue-400 to-blue-500'
                        : 'bg-white/20'
                    }`}
                  >
                    {msg.type === 'user' ? (
                      <User2 className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                </FloatingElement>
                <div className="space-y-4">
                  <div
                    className={`rounded-2xl px-4 py-2 shadow-lg backdrop-blur-sm ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none'
                        : 'bg-white/10 text-white rounded-tl-none'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>

                  {msg.showMoodInput && (
                    <div className="flex gap-2 mt-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <button
                          key={num}
                          onClick={() => handleMoodSubmit(num)}
                          className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  )}

                  {msg.showStressInput && (
                    <div className="flex gap-2 mt-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <button
                          key={num}
                          onClick={() => handleStressSubmit(num)}
                          className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  )}

                  {msg.showSleepButtons && (
                    <div className="flex gap-2 mt-2">
                      {['Poor', 'Fair', 'Good'].map((quality) => (
                        <button
                          key={quality}
                          onClick={() => handleSleepSubmit(quality)}
                          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                          {quality}
                        </button>
                      ))}
                    </div>
                  )}

                  {msg.showQuickReplies && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() =>
                          setMessages((prev) => [
                            ...prev,
                            { type: 'user', text: "I'd like a breathing exercise" },
                            {
                              type: 'bot',
                              text: "Let's try this simple breathing exercise: Breathe in for 4 seconds, hold for 4 seconds, and exhale for 4 seconds. Repeat 5 times.",
                            },
                          ])
                        }
                        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                      >
                        Breathing exercise
                      </button>
                      <button
                        onClick={() =>
                          setMessages((prev) => [
                            ...prev,
                            { type: 'user', text: "I'd like to read some tips" },
                            {
                              type: 'bot',
                              text: 'Here are some helpful tips for managing stress and anxiety...',
                            },
                          ])
                        }
                        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                      >
                        Read tips
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bot Selection UI */}
        {!onboarding && (
          <div className="max-w-4xl mx-auto mt-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Need specialized help? Choose a bot:
            </h2>
            <div className="flex flex-wrap gap-2">
              {specializedBots.map((bot) => (
                <button
                  key={bot.id}
                  onClick={() =>
                    setMessages((prev) => [
                      ...prev,
                      { type: 'user', text: `I want to talk to the ${bot.name}` },
                      {
                        type: 'bot',
                        text: `Switching you to the ${bot.name}. ${bot.description}`,
                      },
                    ])
                  }
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  {bot.icon} {bot.name}
                </button>
              ))}
            </div>
          </div>
        )}
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

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
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
        `}
      </style>
    </div>
  );
};

export default ChatPage;