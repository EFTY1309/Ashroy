import React from 'react';

const FloatingStar = ({ size, color, delay, duration, left, top }) => (
  <div 
    className="absolute"
    style={{
      left: `${left}%`,
      top: `${top}%`,
      animation: `floatStar ${duration}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
    }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transform rotate-45"
    >
      <path
        d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z"
        fill={color}
        className="opacity-60"
      />
    </svg>
  </div>
);

const FloatingStarsBackground = () => {
  const stars = [
    { size: 24, color: '#FFFFFF', delay: 0, duration: 4, left: 10, top: 15 },
    { size: 16, color: '#93C5FD', delay: 1, duration: 5, left: 85, top: 25 },
    { size: 20, color: '#FFFFFF', delay: 2, duration: 6, left: 20, top: 45 },
    { size: 14, color: '#60A5FA', delay: 0.5, duration: 4.5, left: 75, top: 60 },
    { size: 18, color: '#93C5FD', delay: 1.5, duration: 5.5, left: 40, top: 75 },
    { size: 22, color: '#FFFFFF', delay: 2.5, duration: 4.8, left: 90, top: 85 },
    { size: 12, color: '#60A5FA', delay: 1.8, duration: 5.2, left: 5, top: 90 },
    { size: 10, color: '#FFFFFF', delay: 0.7, duration: 4.3, left: 15, top: 35 },
    { size: 15, color: '#93C5FD', delay: 2.2, duration: 5.7, left: 65, top: 40 },
    { size: 8, color: '#FFFFFF', delay: 1.2, duration: 4.6, left: 70, top: 15 },
    { size: 13, color: '#60A5FA', delay: 2.8, duration: 5.3, left: 30, top: 60 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Deep space background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 opacity-90" />
      
      {/* Nebula-like glowing effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-10" />
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-5" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-400 rounded-full blur-3xl opacity-10" />
      
      {/* Stars */}
      {stars.map((star, index) => (
        <FloatingStar key={index} {...star} />
      ))}
      
      <style>
        {`
          @keyframes floatStar {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0.3;
            }
            50% {
              transform: translateY(-15px) rotate(180deg);
              opacity: 0.8;
            }
            100% {
              transform: translateY(0) rotate(360deg);
              opacity: 0.3;
            }
          }
        `}
      </style>
    </div>
  );
};

export default FloatingStarsBackground;