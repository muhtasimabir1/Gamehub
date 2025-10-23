import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const bannerSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&h=1080&fit=crop",
    title: "Discover Epic Adventures",
    subtitle: "Explore a world of indie gaming masterpieces",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920&h=1080&fit=crop",
    title: "Support Indie Developers",
    subtitle: "Every download makes a difference",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1920&h=1080&fit=crop",
    title: "Join the Community",
    subtitle: "Connect with gamers and creators worldwide",
  },
];

export function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + bannerSlides.length) % bannerSlides.length);
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden" data-testid="banner-slider">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
          data-testid={`banner-slide-${currentSlide}`}
        >
          <motion.img
            src={bannerSlides[currentSlide].image}
            alt={bannerSlides[currentSlide].title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 10 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-center px-4 max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 text-foreground" data-testid={`text-banner-title-${currentSlide}`}>
                {bannerSlides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground" data-testid={`text-banner-subtitle-${currentSlide}`}>
                {bannerSlides[currentSlide].subtitle}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-background/20 backdrop-blur-sm hover:bg-background/40"
        onClick={prevSlide}
        data-testid="button-banner-prev"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-background/20 backdrop-blur-sm hover:bg-background/40"
        onClick={nextSlide}
        data-testid="button-banner-next"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary w-8"
                : "bg-muted-foreground/50 hover:bg-muted-foreground"
            }`}
            data-testid={`button-banner-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
