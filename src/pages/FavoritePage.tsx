import Gallery from "@/components/Gallery";
import { useStorage } from "@/hooks/useStorage";
import { getArtworkById } from "@/lib/getArtworkById";
import type { Artwork } from "@/schema/artwork";
import { useEffect, useState } from "react";

const FavoritePage = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const { getJSON } = useStorage();

  useEffect(() => {
    const favorites = getJSON<number[]>("favorites", []);

    const fetchArtworks = async () => {
      const fetched = await Promise.all(
        favorites.map((id) => getArtworkById(id)),
      );

      setArtworks(fetched.filter(Boolean) as Artwork[]);
    };

    fetchArtworks();
  }, [getJSON]);

  return (
    <div className="container mx-auto pt-24">
      <input
        type="text"
        className="w-full p-2 border rounded-lg mb-5"
        placeholder="Search favorites..."
        value={searchInputValue}
        onChange={(e) => setSearchInputValue(e.target.value)}
      />
      <Gallery
        artworks={artworks.filter((artwork) =>
          (artwork?.title ?? "").toLowerCase().includes(searchInputValue.toLowerCase()),
        )}
      />
    </div>
  );
};

export default FavoritePage;
