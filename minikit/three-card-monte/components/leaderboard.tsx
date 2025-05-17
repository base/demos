"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LeaderboardEntry = {
  id: number;
  name: string;
  score: number;
  avatar: string;
  timestamp?: number;
};

// List of avatars to assign randomly
const avatarList = ["👑", "🍀", "👁️", "🧙", "🃏", "👐", "🔍", "🎯", "🐣", "🌱", "🦊", "🐼", "🦁", "🐯", "🦄"];

interface LeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
  userScore?: number;
  userName?: string;
}

export const Leaderboard = ({ isOpen, onClose, userScore, userName }: LeaderboardProps) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [userEntryAdded, setUserEntryAdded] = useState(false);

  // Get a random avatar
  const getRandomAvatar = () => {
    return avatarList[Math.floor(Math.random() * avatarList.length)];
  };

  // Load leaderboard data from localStorage
  useEffect(() => {
    const loadLeaderboard = () => {
      try {
        const storedData = localStorage.getItem('threeCardMonteLeaderboard');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          if (Array.isArray(parsedData)) {
            setLeaderboardData(parsedData);
          }
        }
      } catch (error) {
        console.error('Error loading leaderboard data:', error);
      }
    };

    loadLeaderboard();
    setUserEntryAdded(false);
  }, [isOpen]); // Reload data when modal opens

  // Add user score to leaderboard if needed
  useEffect(() => {
    if (isOpen && userScore !== undefined && userName && !userEntryAdded && userScore > 0) {
      // Create a new entry for the user
      const newUserEntry: LeaderboardEntry = {
        id: Date.now(), // Use timestamp as a unique ID
        name: userName,
        score: userScore,
        avatar: getRandomAvatar(),
        timestamp: Date.now(),
      };

      // Check if user already exists in the leaderboard
      const existingUserEntryIndex = leaderboardData.findIndex(entry => entry.name === userName);
      let updatedLeaderboard: LeaderboardEntry[];

      if (existingUserEntryIndex !== -1) {
        // User exists - update only if new score is higher
        if (userScore > leaderboardData[existingUserEntryIndex].score) {
          const updatedEntries = [...leaderboardData];
          updatedEntries[existingUserEntryIndex] = {
            ...updatedEntries[existingUserEntryIndex],
            score: userScore,
            timestamp: Date.now()
          };
          updatedLeaderboard = updatedEntries;
        } else {
          // No need to update
          setUserEntryAdded(true);
          return;
        }
      } else {
        // Add new user entry
        updatedLeaderboard = [...leaderboardData, newUserEntry];
      }

      // Sort and limit to top 10
      const sortedLeaderboard = updatedLeaderboard
        .sort((a, b) => b.score - a.score) // Sort by score (highest first)
        .slice(0, 10); // Keep only top 10

      // Save to state and localStorage
      setLeaderboardData(sortedLeaderboard);
      try {
        localStorage.setItem('threeCardMonteLeaderboard', JSON.stringify(sortedLeaderboard));
      } catch (error) {
        console.error('Error saving leaderboard data:', error);
      }
      
      setUserEntryAdded(true);
    }
  }, [isOpen, userScore, userName, leaderboardData, userEntryAdded]);

  if (!isOpen) return null;

  // Find user's position in the leaderboard
  const userPosition = userName ? leaderboardData.findIndex(entry => entry.name === userName) : -1;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md bg-gradient-to-b from-indigo-950 to-indigo-900 rounded-xl overflow-hidden shadow-2xl border border-indigo-500/30"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-indigo-700/50 flex justify-between items-center bg-gradient-to-r from-indigo-900 to-purple-900">
              <h2 className="text-xl font-bold text-yellow-300 flex items-center gap-2">
                <span className="text-2xl">🏆</span> Leaderboard
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-indigo-700/50 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-300 hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-5">
              {userScore !== undefined && userName && (
                <div className="mb-5 p-4 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 rounded-lg border border-blue-500/30 shadow-inner">
                  <p className="text-center text-white">
                    {userName}&apos;s score: <span className="font-bold text-yellow-300 text-lg ml-1">{userScore}</span>
                    {userPosition >= 0 && (
                      <span className="ml-2 text-sm text-blue-300">
                        (Rank: {userPosition + 1})
                      </span>
                    )}
                  </p>
                </div>
              )}

              {leaderboardData.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <p>No scores yet. Be the first to make it to the leaderboard!</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {leaderboardData.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      className={`flex items-center p-3.5 rounded-lg ${
                        entry.name === userName ? "bg-gradient-to-r from-blue-900/50 to-blue-800/30 border border-blue-500/30" :
                        index < 3 ? `bg-gradient-to-r ${index === 0 ? "from-amber-900/30 to-yellow-900/20" : 
                                     index === 1 ? "from-slate-700/50 to-slate-800/30" : 
                                     "from-amber-800/20 to-amber-900/10"} border border-yellow-700/20` : 
                        "bg-indigo-950/50 border border-indigo-800/30"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex-shrink-0 w-8 text-center font-bold text-lg">
                        {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}`}
                      </div>
                      
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-xl mr-2">
                        {entry.avatar}
                      </div>
                      
                      <div className="flex-grow">
                        <p className="font-medium text-white">
                          {entry.name}
                          {entry.name === userName && <span className="ml-2 text-xs text-blue-300">(You)</span>}
                        </p>
                      </div>
                      
                      <div className="flex-shrink-0 font-bold text-yellow-300 text-lg">
                        {entry.score}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 