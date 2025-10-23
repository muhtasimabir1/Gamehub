import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

// GameCardProps: { game: Game }

export function GameCard({ game }) {
  return (
    <Link href={`/game/${game.id}`} data-testid={`link-game-${game.id}`}>
      <Card className="overflow-hidden cursor-pointer hover-elevate active-elevate-2 transition-all duration-300 group h-full">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={game.coverPhoto}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            data-testid={`img-game-cover-${game.id}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Badge className="mb-2 bg-primary/20 text-primary border-primary/30 backdrop-blur-sm" data-testid={`badge-category-${game.id}`}>
              {game.category}
            </Badge>
            <h3 className="font-display text-xl font-bold text-foreground mb-2 line-clamp-2" data-testid={`text-game-title-${game.id}`}>
              {game.title}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-chart-4 text-chart-4" />
                <span className="font-accent text-sm font-bold text-chart-4" data-testid={`text-rating-${game.id}`}>
                  {game.ratings}
                </span>
              </div>
              <span className="text-sm text-muted-foreground" data-testid={`text-developer-${game.id}`}>
                {game.developer}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
