'use client';

import React from 'react';

export const PixelatedBridgeLogo: React.FC = () => {
  return (
    <div className="flex justify-center mb-6">
      <div className="relative">
        {/* Pixelated Bridge SVG */}
        <svg 
          width="120" 
          height="60" 
          viewBox="0 0 120 60" 
          className="hacker-text"
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Bridge towers */}
          <rect x="10" y="20" width="4" height="30" fill="#00ff00" />
          <rect x="106" y="20" width="4" height="30" fill="#00ff00" />
          
          {/* Tower tops */}
          <rect x="8" y="15" width="8" height="8" fill="#00ff00" />
          <rect x="104" y="15" width="8" height="8" fill="#00ff00" />
          
          {/* Main cables */}
          <path 
            d="M 12 23 Q 60 35 108 23" 
            stroke="#00ff00" 
            strokeWidth="2" 
            fill="none"
            style={{ filter: 'drop-shadow(0 0 3px #00ff00)' }}
          />
          <path 
            d="M 12 25 Q 60 37 108 25" 
            stroke="#00ff00" 
            strokeWidth="2" 
            fill="none"
            style={{ filter: 'drop-shadow(0 0 3px #00ff00)' }}
          />
          
          {/* Vertical cables */}
          {Array.from({ length: 9 }, (_, i) => {
            const x = 20 + i * 10;
            const cableHeight = Math.abs(Math.sin((i + 1) * 0.5)) * 8 + 8;
            return (
              <line
                key={i}
                x1={x}
                y1={24}
                x2={x}
                y2={24 + cableHeight}
                stroke="#00ff00"
                strokeWidth="1"
                style={{ filter: 'drop-shadow(0 0 2px #00ff00)' }}
              />
            );
          })}
          
          {/* Bridge deck */}
          <rect x="15" y="45" width="90" height="3" fill="#00ff00" />
          
          {/* Pixelated details */}
          <rect x="12" y="18" width="2" height="2" fill="#ffffff" />
          <rect x="106" y="18" width="2" height="2" fill="#ffffff" />
          
          {/* Glow effects */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
        
        {/* Matrix-style background effect */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="absolute w-px h-full bg-gradient-to-b from-transparent via-green-500 to-transparent opacity-20"
              style={{
                left: `${20 + i * 20}%`,
                animation: `matrix-rain ${3 + i}s linear infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

