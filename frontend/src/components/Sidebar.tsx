import React from "react";
import { Bot, Activity, Heart, User } from "lucide-react"; // Use valid icons

interface BotOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC<{ onSelectBot: (botId: string) => void }> = ({ onSelectBot }) => {
  const bots: BotOption[] = [
    { id: "ashroy", name: "Ashroy - Mental Health Bot", icon: <Bot className="w-6 h-6" /> },  // Use Bot here
    { id: "fitness", name: "Fitness Bot", icon: <Activity className="w-6 h-6" /> },
    { id: "mood", name: "Mood Tracker Bot", icon: <Heart className="w-6 h-6" /> },
    { id: "general", name: "General Chat Bot", icon: <User className="w-6 h-6" /> },
  ];

  return (
    <div className="bg-gray-800 text-white h-full p-4 w-64">
      <h2 className="text-xl font-bold mb-6">Choose Your Bot</h2>
      <ul>
        {bots.map((bot) => (
          <li
            key={bot.id}
            onClick={() => onSelectBot(bot.id)}
            className="flex items-center mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded-lg"
          >
            {bot.icon}
            <span className="ml-2">{bot.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
