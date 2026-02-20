import { Link } from "react-router";
import type { Artwork } from "../schema/artwork";
import { Button } from "./ui/button";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { is } from "zod/locales";
// import parse from "html-react-parser";

type ArtworkCardProps = {
  artwork: Artwork;
};

const ArtworkCard = ({ artwork }: ArtworkCardProps) => {
  const [isFavorite, setIsFavorite] = useState(
    JSON.parse(localStorage.getItem("favorites") || "[]")?.includes(artwork.id),
  );
  if (!artwork) return null;

  function toggleFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (!favorites.includes(artwork.id)) {
      favorites.push(artwork.id);
      setIsFavorite(true);
    } else {
      const index = favorites.indexOf(artwork.id);
      if (index > -1) {
        favorites.splice(index, 1);
        setIsFavorite(false);
      }
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  const imageUrl = artwork.image_id
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`
    : "https://wahooart.com/media/artworks/images/full/ae/b9/aeb9e0548b9a4ed0be9828286be2c9f9.JPG";

  return (
    <div className="rounded-xl overflow-hidden shadow-lg h-full cursor-pointer border bg-white border-gray-100 flex flex-col">
      <div className="relative h-64 w-full overflow-hidden shrink-0">
        <FaStar
          className={cn(
            "absolute top-3 right-3 text-white text-xl opacity-75",
            isFavorite ? "fill-yellow-400" : "fill-gray-400",
          )}
          onClick={toggleFavorites}
        />
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={artwork?.title || "Artwork Image"}
            className="object-cover h-full w-full"
          />
        ) : null}
      </div>

      {/* content area */}
      <div className="p-6 text-center flex flex-col flex-1 min-h-0">
        <div className="flex-1 min-h-0">
          <h2 className="text-xl font-bold line-clamp-1">{artwork?.title}</h2>
          <p className="mt-3 line-clamp-1">
            {artwork?.artist_title ? artwork?.artist_title : "Unknown Artist"}
          </p>
          <p>({artwork?.date_start ? artwork?.date_start : "Unknown Date"})</p>
          <p className="line-clamp-2 mt-7 mb-6 text-gray-600">
            {artwork.thumbnail?.alt_text}
          </p>
        </div>

        <Link to={`/artwork/${artwork.id}`}>
          <Button variant="default" className="w-full mt-2">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ArtworkCard;
