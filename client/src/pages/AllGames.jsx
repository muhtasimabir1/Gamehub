import { useEffect } from "react";
import { motion } from "framer-motion";
import { GameCard } from "@/components/GameCard";
import gamesData from "../../../server/data/games.json";

export default function AllGames() {
  useEffect(() => {
    document.title = "All Games - GameHub";
  }, []);

  const games = gamesData;
  const sortedGames = [...games].sort((a, b) => parseFloat(b.ratings) - parseFloat(a.ratings));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="border-l-4 border-primary pl-4 mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2" data-testid="text-all-games-title">
            All Games
          </h1>
          <p className="text-muted-foreground" data-testid="text-all-games-subtitle">
            Browse our complete collection of {games.length} indie games
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sortedGames.map((game) => (
            <motion.div key={game.id} variants={itemVariants}>
              <GameCard game={game} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
