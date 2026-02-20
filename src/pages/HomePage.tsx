import { useEffect, useState } from "react";
import { getArtwork } from "../hooks/getArtwork";
import Gallery from "../components/Gallery";
import type { Artwork } from "../schema/artwork";

const HomePage = () => {
  const [artworks, setArtworks] = useState<Artwork[] | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const artworksData = await getArtwork(search, 100, page, "date_start");
      setArtworks(artworksData);
    }
    fetchData();
  }, [search, page]);
  return (

    
    <div className="container mx-auto mt-10">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          const timeout = setTimeout(() => setSearch(e.target.value), 500);
          console.log("Search input changed:", e.target.value);
          console.log("Current search state:", search);
          return () => clearTimeout(timeout);
        }}
        placeholder="Search artworks..."
        className="mb-5 p-2 border border-gray-300 rounded w-full"
      />
      <Gallery artworks={artworks || []} />
    </div>
  );
};

export default HomePage;
