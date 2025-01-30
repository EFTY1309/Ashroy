import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Flame, Target, Moon, Timer, Book, ChevronRight } from 'lucide-react';

const StorytellingWellness = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [streak, setStreak] = useState(3);
  const [points, setPoints] = useState(150);
  const [mood, setMood] = useState(null);
  const [stressLevel, setStressLevel] = useState(0);
  const [sleepHours, setSleepHours] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const stories = [
    {
      title: "Dawn of a New Day",
      content: "As the morning sun peeks through your window, its gentle rays remind you of new beginnings. How are you feeling as you start this new day?",
      input: "mood",
      icon: "☀️",
      bgClass: "from-amber-50 to-blue-50"
    },
    {
      title: "The River of Calm",
      content: "Imagine yourself by a serene blue river. The water flows endlessly, washing away tensions. On a scale of peaceful river (0) to stormy waters (10), how do you feel right now?",
      input: "stress",
      icon: "🌊",
      bgClass: "from-blue-50 to-cyan-50"
    },
    {
      title: "Night's Embrace",
      content: "Think back to last night's rest, when the stars watched over you. How many hours did you spend in dreamland?",
      input: "sleep",
      icon: "🌙",
      bgClass: "from-indigo-50 to-purple-50"
    }
  ];

  const moods = [
    { id: 'serene', emoji: '😌', label: 'Serene', points: 10, color: 'bg-gradient-to-br from-blue-50 to-blue-100' },
    { id: 'joyful', emoji: '😊', label: 'Joyful', points: 8, color: 'bg-gradient-to-br from-amber-50 to-amber-100' },
    { id: 'peaceful', emoji: '😐', label: 'Peaceful', points: 6, color: 'bg-gradient-to-br from-green-50 to-green-100' },
    { id: 'reflective', emoji: '🤔', label: 'Reflective', points: 4, color: 'bg-gradient-to-br from-purple-50 to-purple-100' }
  ];

  const handleNext = () => {
    if (currentStep < stories.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
      setPoints(points + 30);
      setStreak(streak + 1);
    }
  };

  const renderInput = () => {
    switch (stories[currentStep].input) {
      case 'mood':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {moods.map((m) => (
              <button
                key={m.id}
                onClick={() => setMood(m.id)}
                className={`${m.color} p-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md ${
                  mood === m.id ? 'ring-2 ring-blue-400 scale-105' : ''
                } hover:scale-105`}
              >
                <div className="text-4xl mb-3">{m.emoji}</div>
                <div className="text-sm font-medium">{m.label}</div>
                <div className="text-xs text-blue-600 mt-1">+{m.points} pts</div>
              </button>
            ))}
          </div>
        );
      case 'stress':
        return (
          <div className="space-y-6 mt-8">
            <div className="h-2 bg-gradient-to-r from-blue-100 to-red-100 rounded-full overflow-hidden">
              <input
                type="range"
                min="0"
                max="10"
                value={stressLevel}
                onChange={(e) => setStressLevel(e.target.value)}
                className="w-full h-2 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
              />
            </div>
            <div className="flex justify-between text-sm text-blue-600/80">
              <span>Peaceful Waters</span>
              <span>Stormy Seas</span>
            </div>
          </div>
        );
      case 'sleep':
        return (
          <div className="mt-8">
            <input
              type="number"
              value={sleepHours}
              onChange={(e) => setSleepHours(e.target.value)}
              min="0"
              max="24"
              className="w-full p-4 text-center text-2xl border-none bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl focus:ring-2 focus:ring-blue-200 focus:outline-none"
              placeholder="Hours of rest..."
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${stories[currentStep].bgClass} p-8 transition-all duration-500`}>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Progress Banner */}
        <div className="grid grid-cols-3 gap-6">
          <Card className="bg-white/40 backdrop-blur-md border-none">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Book className="text-blue-500 w-5 h-5" />
                <div>
                  <p className="text-xs font-medium text-blue-600/80">Progress</p>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-xl font-bold text-blue-900">{currentStep + 1}</span>
                    <span className="text-blue-400">/3</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/40 backdrop-blur-md border-none">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Flame className="text-orange-500 w-5 h-5" />
                <div>
                  <p className="text-xs font-medium text-blue-600/80">Streak</p>
                  <p className="text-xl font-bold text-blue-900">{streak}<span className="text-sm text-blue-400 ml-1">days</span></p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/40 backdrop-blur-md border-none">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Trophy className="text-yellow-500 w-5 h-5" />
                <div>
                  <p className="text-xs font-medium text-blue-600/80">Points</p>
                  <p className="text-xl font-bold text-blue-900">{points}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {!isComplete ? (
          <Card className="bg-white/60 backdrop-blur-md border-none shadow-xl">
            <CardHeader className="text-center pb-2">
              <div className="text-5xl mb-4">{stories[currentStep].icon}</div>
              <CardTitle className="text-2xl font-serif text-blue-900">
                {stories[currentStep].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pb-8">
              <p className="text-lg text-blue-700/80 text-center font-light leading-relaxed">
                {stories[currentStep].content}
              </p>
              {renderInput()}
              <Button 
                onClick={handleNext}
                className="w-full mt-8 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-lg py-6 rounded-xl group"
              >
                Continue Your Journey
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white/60 backdrop-blur-md text-center p-12 border-none shadow-xl">
            <div className="text-7xl mb-6">✨</div>
            <h2 className="text-3xl font-serif text-blue-900 mb-4">Journey Complete!</h2>
            <p className="text-lg text-blue-700/80 font-light leading-relaxed max-w-md mx-auto">
              Thank you for sharing your story today. Your insights help create a better tomorrow.
            </p>
            <div className="mt-6 text-blue-500 font-medium">
              <Trophy className="inline-block w-5 h-5 mr-2 text-yellow-500" />
              30 points earned!
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StorytellingWellness;