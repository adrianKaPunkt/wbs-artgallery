import Gallery from "@/components/Gallery";
import { useStorage } from "@/hooks/useStorage";
import { getArtworkById } from "@/lib/getArtworkById";
import type { Artwork } from "@/schema/artwork";
import { useEffect, useState } from "react";

const FavoritePage = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
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
    <div className="container mx-auto mt-10">
      <Gallery artworks={artworks} />
    </div>
  );
};

export default FavoritePage;
