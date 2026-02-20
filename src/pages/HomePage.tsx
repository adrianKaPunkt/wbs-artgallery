import { useEffect, useState } from "react";
import { getArtwork } from "../hooks/getArtwork";
import Gallery from "../components/Gallery";
import type { Artwork, Pagination } from "../schema/artwork";

const HomePage = () => {
  const [artworks, setArtworks] = useState<Artwork[] | null>(null);
  const [search, setSearch] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [limit, setLimit] = useState(100);

  useEffect(() => {
    const timeout = setTimeout(() => setSearch(searchInputValue), 350);
    return () => clearTimeout(timeout);
  }, [searchInputValue]);

  useEffect(() => {
    async function fetchData() {
      const { items, pagination } = await getArtwork(search, limit, page, "");
      console.log(pagination);
      setArtworks(items);
      setPagination(pagination);
    }
    fetchData();
  }, [search, page, limit]);

  return (
    <div className="container mx-auto mt-10">
      <input
        type="text"
        value={searchInputValue}
        onChange={(e) => setSearchInputValue(e.target.value)}
        placeholder="Search artworks..."
        className="mb-5 p-2 border border-gray-300 rounded w-full"
      />
      <div className="flex flex-col items-center justify-center">
        <div>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="mr-2 px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page
            <input
              type="text"
              value={page}
              onChange={(e) => setPage(Number(e.target.value))}
              className="ml-2 w-16 p-1 border border-gray-300 rounded"
            />
          </span>
          <button
            disabled={
              pagination
                ? page >= Math.ceil(pagination.total / pagination.limit)
                : false
            }
            onClick={() =>
              setPage((prev) =>
                Math.min(prev + 1, pagination?.total_pages || prev + 1),
              )
            }
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {pagination && (
          <div className="mt-2 text-sm text-gray-600">
            Page {pagination.current_page} of {pagination.total_pages}
          </div>
        )}
      </div>
      <Gallery artworks={artworks || []} />
    </div>
  );
};

export default HomePage;
