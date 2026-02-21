import { motion } from "framer-motion";
import { useStorage } from "@/hooks/useStorage";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FaStar } from "react-icons/fa";

type StarProps = {
  id: string | number | undefined;
  size?: number;
  className?: string;
};

const Star = ({ id, size = 30, className }: StarProps) => {
  const { getJSON, setJSON } = useStorage();
  const [animateStar, setAnimateStar] = useState(false);
  const favorites = getJSON<number[]>("favorites", []);
  const isFavorite =
    id !== null && id !== undefined && favorites.includes(Number(id));

  function toggleFavorites() {
    const next = isFavorite
      ? favorites.filter((favId) => favId !== Number(id))
      : [...favorites, Number(id)];
    setJSON("favorites", next);

    if (!isFavorite) {
      setAnimateStar(true);
      setTimeout(() => {
        setAnimateStar(false);
      }, 1800);
    }
  }

  return (
    <motion.div
      animate={
        animateStar
          ? {
              scale: [1, 1.5, 0.95, 1.2, 0.7, 1],
              filter: [
                "drop-shadow(0 0 0px rgba(255, 215, 0, 0))",
                "drop-shadow(0 0 12px rgba(255, 215, 0, 0.9))",
                "drop-shadow(0 0 6px rgba(255, 215, 0, 0.6))",
                "drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))",
                "drop-shadow(0 0 0px rgba(255, 215, 0, 0))",
              ],
            }
          : { scale: 1, filter: "drop-shadow(0 0 0px rgba(0,0,0,0))" }
      }
      transition={{
        duration: 1.8,
        ease: "easeInOut",
        repeat: 5,
      }}
    >
      <FaStar
        size={size}
        className={cn(
          className,
          "text-2xl hover:scale-125 transition-transform cursor-pointer",
          isFavorite ? "fill-yellow-400" : "fill-gray-200",
        )}
        onClick={toggleFavorites}
      />
    </motion.div>
  );
};

export default Star;
