import { useEffect, useState } from "react";
import { getArtwork } from "../lib/getArtwork";
import { FaSearch } from "react-icons/fa";
import Gallery from "../components/Gallery";
import type { Artwork, Pagination } from "../schema/artwork";

const HomePage = () => {
  const [artworks, setArtworks] = useState<Artwork[] | null>(null);
  const [search, setSearch] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    const timeout = setTimeout(() => setSearch(searchInputValue), 350);
    return () => clearTimeout(timeout);
  }, [searchInputValue]);

  useEffect(() => {
    async function fetchData() {
      const { items, pagination } = await getArtwork(search, limit, page, "");
      setArtworks(items);
      setPagination(pagination);
    }
    fetchData();
  }, [search, page, limit]);

  return (
    <div>
      <div className="relative">
        <img
          src="https://www.whudat.de/images/2024/01/Great-Art-Explained-Salvador-Dali-BB.jpg"
          alt="hero-imgage"
          className="w-full max-h-[50vh] object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="relative w-1/2">
            <FaSearch className="absolute top-8 left-7 text-gray-500" />
            <input
              type="text"
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              placeholder="Search artworks..."
              className="mb-5 py-7 pl-16 bg-white/60 rounded-3xl w-full"
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto pt-12">
        <Gallery artworks={artworks || []} />
        <div className="flex flex-col items-center justify-center my-10">
          <div>
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="mx-4">
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
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>

          {pagination && (
            <>
              <div className="mt-2 text-sm text-gray-600">
                Page {pagination.current_page} of {pagination.total_pages}
              </div>
              <div>
                <input
                  type="number"
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  className="mt-2 w-20 p-1 border border-gray-300 rounded"
                  min={0}
                  max={100}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
