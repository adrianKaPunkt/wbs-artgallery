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
      const artworksData = await getArtwork(search, 100, page, "");
      setArtworks(artworksData);
    }
    fetchData();
  }, [search, page]);
  return (

    
    <div className="container mx-auto mt-10">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search artworks..."
        className="mb-5 p-2 border border-gray-300 rounded w-full"
      />
      <div>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="mr-2 px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
      <Gallery artworks={artworks || []} />
    </div>
  );
};

export default HomePage;
