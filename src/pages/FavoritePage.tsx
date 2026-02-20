import Gallery from "@/components/Gallery";
import { getArtworkById } from "@/lib/getArtworkById";
import type { Artwork } from "@/schema/artwork";
import { useEffect, useState } from "react";

const FavoritePage = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    const parsedFavorites = JSON.parse(storedFavorites || "[]");
    const fetchArtworks = async () => {
      const fetchedArtworks: Artwork[] = [];
      for (const id of parsedFavorites) {
        const artwork = await getArtworkById(id);
        if (artwork) {
          fetchedArtworks.push(artwork);
        }
      }
      setArtworks(fetchedArtworks);
    };
    fetchArtworks();
  }, [refresh]);

  function handleFavoriteChange() {
    setRefresh((prev) => !prev);
  }

  return (
    <div className="container mx-auto mt-10">
      <Gallery
        artworks={artworks}
        handleFavoriteChange={handleFavoriteChange}
      />
    </div>
  );
};

export default FavoritePage;
