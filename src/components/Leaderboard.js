import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mock API function - replace with actual backend call
const fetchLeaderboardData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock response from backend
  return [
    { teamId: 1, team_name: "Alpha Hackers", points: 2850 },
    { teamId: 2, team_name: "Cyber Legends", points: 2780 },
    { teamId: 3, team_name: "Dark Force", points: 2650 },
    { teamId: 4, team_name: "Shadow Stars", points: 2420 },
    { teamId: 5, team_name: "Beta Warriors", points: 2100 },
    { teamId: 6, team_name: "Code Crushers", points: 1950 },
    { teamId: 7, team_name: "Tech Titans", points: 1820 },
    { teamId: 8, team_name: "Pixel Pirates", points: 1650 }
  ].sort((a, b) => b.points - a.points);
};

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="space-y-3">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
        className="grid grid-cols-4 gap-4 py-6 px-8 bg-yellow-400/10 rounded-xl"
      >
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-yellow-400/30 rounded-full"></div>
        </div>
        <div className="col-span-2 space-y-2">
          <div className="h-5 bg-yellow-400/30 rounded w-3/4"></div>
          <div className="h-2 bg-yellow-400/20 rounded w-full"></div>
        </div>
        <div className="flex justify-center">
          <div className="h-6 w-16 bg-yellow-400/30 rounded"></div>
        </div>
      </motion.div>
    ))}
  </div>
);

const getPositionStyles = (position) => {
  switch(position) {
    case 1: 
      return "bg-gradient-to-br from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-400/30";
    case 2:
      return "bg-gradient-to-br from-gray-300 to-gray-400 text-black shadow-lg shadow-gray-400/30";
    case 3:
      return "bg-gradient-to-br from-orange-400 to-orange-500 text-black shadow-lg shadow-orange-400/30";
    default:
      return "bg-gradient-to-br from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-400/40";
  }
};

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch data from backend
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchLeaderboardData();
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to load leaderboard data');
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Manual refresh function
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const result = await fetchLeaderboardData();
      setData(result);
    } catch (err) {
      setError('Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Simple Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-amber-500/5"></div>
        
        {/* Minimal floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex justify-center items-center min-h-screen p-4"
      >
        <div className="w-full max-w-6xl">
          {/* Clean Title */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent mb-4">
              LEADERBOARD
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Refresh Button */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {refreshing ? (
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                  />
                  <span>Refreshing...</span>
                </div>
              ) : (
                "Refresh Rankings"
              )}
            </motion.button>
          </motion.div>

          {/* Main Leaderboard Container */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="backdrop-blur-xl bg-black/60 rounded-2xl border border-yellow-400/30 shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black py-6 px-8">
              <div className="grid grid-cols-4 gap-4 font-bold text-lg md:text-xl">
                <div className="text-center">Rank</div>
                <div className="text-left col-span-2">Team Name</div>
                <div className="text-center">Points</div>
              </div>
            </div>

            {/* Content Area */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8"
                  >
                    <LoadingSkeleton />
                  </motion.div>
                ) : error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16 text-red-400"
                  >
                    <div className="text-4xl mb-4">⚠️</div>
                    <p className="text-lg mb-4">{error}</p>
                    <button
                      onClick={handleRefresh}
                      className="px-6 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
                    >
                      Try Again
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="data"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="divide-y divide-yellow-400/20"
                  >
                    {data.map((team, index) => (
                      <motion.div
                        key={team.teamId}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ 
                          delay: 0.05 * index,
                          duration: 0.5
                        }}
                        whileHover={{ 
                          backgroundColor: "rgba(255, 193, 7, 0.05)"
                        }}
                        className="grid grid-cols-4 gap-4 py-6 px-8 items-center transition-colors duration-200 cursor-pointer"
                      >
                        {/* Rank */}
                        <div className="text-center">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl font-bold text-lg md:text-xl ${getPositionStyles(index + 1)}`}
                          >
                            {index + 1}
                          </motion.div>
                        </div>

                        {/* Team Info */}
                        <div className="col-span-2">
                          <motion.h3 
                            className="text-white font-bold text-lg md:text-xl mb-2"
                            whileHover={{ color: "#FCD34D" }}
                          >
                            {team.team_name}
                          </motion.h3>
                          
                          {/* Progress Bar */}
                          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(team.points / Math.max(...data.map(t => t.points))) * 100}%` }}
                              transition={{ delay: 0.3 + index * 0.05, duration: 1 }}
                              className={`h-full rounded-full ${
                                index === 0 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' :
                                index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400' :
                                index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                                'bg-gradient-to-r from-yellow-500/60 to-amber-500/60'
                              }`}
                            />
                          </div>
                        </div>

                        {/* Points */}
                        <div className="text-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
                          >
                            <div className="text-yellow-400 font-bold text-xl md:text-2xl">
                              {team.points.toLocaleString()}
                            </div>
                            <div className="text-gray-400 text-xs">points</div>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Status Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-8"
          >
            <div className="flex justify-center items-center space-x-4 text-yellow-400/70 text-sm">
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-400 rounded-full"
                />
                <span>Live</span>
              </div>
              <span>•</span>
              <span>Updated: {new Date().toLocaleTimeString()}</span>
              <span>•</span>
              <span>Auto-refresh: 30s</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;