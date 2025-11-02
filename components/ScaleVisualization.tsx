'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ScaleVisualizationProps {
  robotHeight: number; // in cm
}

export default function ScaleVisualization({ robotHeight }: ScaleVisualizationProps) {
  const [userHeight, setUserHeight] = useState(175); // Default average height in cm
  
  // Calculate scale factors (base height for visualization: 200cm = 100% of container)
  const maxHeight = 200;
  const robotScale = (robotHeight / maxHeight) * 100;
  const humanScale = (userHeight / maxHeight) * 100;

  return (
    <div className="card">
      <h3 className="text-2xl font-bold mb-6 text-neutral-light">
        Porównanie Wysokości
      </h3>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="height-slider" className="text-neutral-gray">
            Twój wzrost: <span className="text-accent font-bold">{userHeight} cm</span>
          </label>
          <button
            onClick={() => setUserHeight(175)}
            className="text-sm text-accent hover:underline"
          >
            Reset
          </button>
        </div>
        
        <input
          id="height-slider"
          type="range"
          min="140"
          max="210"
          step="1"
          value={userHeight}
          onChange={(e) => setUserHeight(parseInt(e.target.value))}
          className="w-full h-3 bg-primary-dark rounded-lg appearance-none cursor-pointer accent-accent"
        />
        
        <div className="flex justify-between text-xs text-neutral-gray mt-2">
          <span>140 cm</span>
          <span>175 cm</span>
          <span>210 cm</span>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="relative bg-gradient-to-b from-primary-dark to-primary rounded-lg p-8 overflow-hidden min-h-[400px]">
        {/* Ground Line */}
        <div className="absolute bottom-8 left-0 right-0 h-1 bg-accent/20"></div>

        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-accent"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative flex items-end justify-around h-[350px]">
          {/* Human Figure */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative mb-3">
              <motion.div
                animate={{ height: `${humanScale}%` }}
                transition={{ type: 'spring', damping: 20 }}
                className="relative"
                style={{ maxHeight: '300px' }}
              >
                {/* Simple Human SVG */}
                <svg
                  viewBox="0 0 100 200"
                  className="w-20 text-neutral-light"
                  style={{ height: `${(humanScale / 100) * 300}px` }}
                >
                  {/* Head */}
                  <circle cx="50" cy="20" r="15" fill="currentColor" />
                  {/* Body */}
                  <rect x="40" y="35" width="20" height="50" fill="currentColor" rx="3" />
                  {/* Arms */}
                  <rect x="25" y="40" width="15" height="8" fill="currentColor" rx="4" />
                  <rect x="60" y="40" width="15" height="8" fill="currentColor" rx="4" />
                  {/* Legs */}
                  <rect x="42" y="85" width="7" height="55" fill="currentColor" rx="3" />
                  <rect x="51" y="85" width="7" height="55" fill="currentColor" rx="3" />
                </svg>
              </motion.div>
              
              {/* Height Label */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className="px-2 py-1 bg-neutral-light text-primary rounded text-xs font-bold">
                  {userHeight} cm
                </div>
              </div>
            </div>
            
            <p className="text-sm font-semibold text-neutral-gray">Ty</p>
          </motion.div>

          {/* Robot Figure */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative mb-3">
              <motion.div
                animate={{ height: `${robotScale}%` }}
                transition={{ type: 'spring', damping: 20 }}
                className="relative"
                style={{ maxHeight: '300px' }}
              >
                {/* Simple Robot SVG */}
                <svg
                  viewBox="0 0 100 200"
                  className="w-20 text-accent"
                  style={{ height: `${(robotScale / 100) * 300}px` }}
                >
                  {/* Antenna */}
                  <line x1="50" y1="5" x2="50" y2="10" stroke="currentColor" strokeWidth="2" />
                  <circle cx="50" cy="3" r="3" fill="currentColor" />
                  
                  {/* Head */}
                  <rect x="35" y="10" width="30" height="25" fill="currentColor" rx="3" />
                  <circle cx="42" cy="20" r="3" fill="#0A0E1A" />
                  <circle cx="58" cy="20" r="3" fill="#0A0E1A" />
                  
                  {/* Body */}
                  <rect x="37" y="38" width="26" height="55" fill="currentColor" rx="3" />
                  
                  {/* Arms */}
                  <rect x="20" y="45" width="17" height="10" fill="currentColor" rx="4" />
                  <rect x="63" y="45" width="17" height="10" fill="currentColor" rx="4" />
                  
                  {/* Legs */}
                  <rect x="40" y="93" width="8" height="58" fill="currentColor" rx="3" />
                  <rect x="52" y="93" width="8" height="58" fill="currentColor" rx="3" />
                  
                  {/* Details */}
                  <rect x="43" y="50" width="14" height="3" fill="#0A0E1A" rx="1" />
                  <rect x="43" y="58" width="14" height="3" fill="#0A0E1A" rx="1" />
                  <rect x="43" y="66" width="14" height="3" fill="#0A0E1A" rx="1" />
                </svg>
              </motion.div>
              
              {/* Height Label */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className="px-2 py-1 bg-accent text-primary rounded text-xs font-bold">
                  {robotHeight} cm
                </div>
              </div>
            </div>
            
            <p className="text-sm font-semibold text-accent">Robot</p>
          </motion.div>
        </div>

        {/* Comparison Info */}
        <div className="mt-6 p-4 bg-primary/50 rounded-lg border border-accent/20">
          <p className="text-sm text-neutral-gray text-center">
            {robotHeight > userHeight ? (
              <>
                Robot jest <span className="text-accent font-bold">o {robotHeight - userHeight} cm wyższy</span> niż Ty
              </>
            ) : robotHeight < userHeight ? (
              <>
                Robot jest <span className="text-accent font-bold">o {userHeight - robotHeight} cm niższy</span> niż Ty
              </>
            ) : (
              <>
                Robot ma <span className="text-accent font-bold">dokładnie taki sam wzrost</span> jak Ty
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
