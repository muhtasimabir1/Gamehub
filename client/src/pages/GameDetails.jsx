import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Star, Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import gamesData from "../../../server/data/games.json";
import { Link } from "wouter";

export default function GameDetails() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const gameId = params.id;

  const games = gamesData;
  const game = games.find((g) => g.id === gameId);

  useEffect(() => {
    if (game) {
      document.title = `${game.title} - GameHub`;
    }
  }, [game]);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Game not found</h2>
          <Link href="/games">
            <Button data-testid="button-back-to-games">Back to Games</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen py-8 md:py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/games">
            <Button variant="ghost" className="mb-8" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Games
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden">
              <img
                src={game.coverPhoto}
                alt={game.title}
                className="w-full aspect-[3/4] object-cover"
                data-testid="img-game-cover"
              />
            </Card>
          </motion.div>

          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <Badge className="mb-4" data-testid="badge-category">
                {game.category}
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4" data-testid="text-game-title">
                {game.title}
              </h1>
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-chart-4 text-chart-4" />
                  <span className="font-accent text-lg font-bold text-chart-4" data-testid="text-rating">
                    {game.ratings}
                  </span>
                  <span>Rating</span>
                </div>
                <div data-testid="text-developer">
                  by <span className="text-foreground font-semibold">{game.developer}</span>
                </div>
              </div>
            </div>

            <Card className="p-6">
              <h2 className="font-display text-2xl font-bold mb-4">About This Game</h2>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-description">
                {game.description}
              </p>
            </Card>

            <motion.a
              href={game.downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="w-full md:w-auto" data-testid="button-download">
                <Download className="h-5 w-5 mr-2" />
                Download Game
              </Button>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
