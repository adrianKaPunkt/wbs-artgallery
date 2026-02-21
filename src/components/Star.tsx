import { useStorage } from "@/hooks/useStorage";
import { cn } from "@/lib/utils";
import { FaStar } from "react-icons/fa";

type StarProps = {
  id: string | number | undefined;
  size?: number;
  className?: string;
};

const Star = ({ id, size = 30, className }: StarProps) => {
  const { getJSON, setJSON } = useStorage();
  const favorites = getJSON<number[]>("favorites", []);
  const isFavorite =
    id !== null && id !== undefined && favorites.includes(Number(id));

  function toggleFavorites() {
    const next = isFavorite
      ? favorites.filter((favId) => favId !== Number(id))
      : [...favorites, Number(id)];
    setJSON("favorites", next);
  }

  return (
    <>
      <FaStar
        size={size}
        className={cn(
          className,
          "text-2xl hover:scale-125 transition-transform cursor-pointer",
          isFavorite ? "fill-yellow-400" : "fill-gray-200",
        )}
        onClick={toggleFavorites}
      />
    </>
  );
};

export default Star;
