import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90 z-10" />

      {/* Background image with blur effect */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
        style={{
          backgroundImage: "url('/src/assets/background.jpg')",
        }}
      />

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Animated heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Welcome to{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              Ashroy
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-gray-200">
            Your AI-powered mental health companion
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 mb-8">
            <Card className="bg-white/10 border-0 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center p-6 text-white">
                <MessageCircle className="w-12 h-12 mb-4 text-blue-400" />
                <h3 className="text-lg font-semibold mb-2">AI Chat Support</h3>
                <p className="text-sm text-gray-300 text-center">
                  24/7 compassionate conversation and guidance
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-0 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center p-6 text-white">
                <LineChart className="w-12 h-12 mb-4 text-violet-400" />
                <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
                <p className="text-sm text-gray-300 text-center">
                  Monitor your mental wellness journey
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Call to action buttons with navigation links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/chat">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white px-8"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Chat
              </Button>
            </Link>

            <Link to="/metrics">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 px-8"
              >
                <LineChart className="mr-2 h-5 w-5" />
                Log Metrics
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
