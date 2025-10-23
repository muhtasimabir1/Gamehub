import { useEffect } from "react";
import { motion } from "framer-motion";
import { BannerSlider } from "@/components/BannerSlider";
import { GameCard } from "@/components/GameCard";
import { Newsletter } from "@/components/Newsletter";
import gamesData from "../../../server/data/games.json";

export default function Home() {
  useEffect(() => {
    document.title = "GameHub - Discover Indie Games";
  }, []);

  const games = gamesData;
  const sortedGames = [...games].sort((a, b) => parseFloat(b.ratings) - parseFloat(a.ratings));
  const popularGames = sortedGames.slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <BannerSlider />

      <section className="w-full py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="border-l-4 border-primary pl-4 mb-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2" data-testid="text-popular-title">
              Popular Games
            </h2>
            <p className="text-muted-foreground" data-testid="text-popular-subtitle">
              Top-rated games loved by the community
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {popularGames.map((game, index) => (
              <motion.div key={game.id} variants={itemVariants}>
                <GameCard game={game} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Newsletter />
    </motion.div>
  );
}
