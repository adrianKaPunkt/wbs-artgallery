import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getArtwork } from "../lib/getArtwork";
import { FaSearch } from "react-icons/fa";
import Gallery from "../components/Gallery";

import type { Artwork, Pagination } from "../schema/artwork";
import PaginationComponent from "@/components/PaginationComponent";

const HomePage = () => {
  const [artworks, setArtworks] = useState<Artwork[] | null>(null);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [searchInputValue, setSearchInputValue] = useState(() => {
    return searchParams.get("search") ?? "";
  });
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
            <FaSearch className="absolute top-8 left-7 text-black/80" />
            <input
              type="text"
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              placeholder="Search artworks..."
              className="mb-5 py-7 pl-16 bg-white/60 rounded-3xl w-full placeholder:text-black/80"
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto pt-12">
        <Gallery artworks={artworks || []} />
        {pagination && (
          <PaginationComponent
            pagination={pagination}
            page={page}
            limit={limit}
            setPage={setPage}
            setLimit={setLimit}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
