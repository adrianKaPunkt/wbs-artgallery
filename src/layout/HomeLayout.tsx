import { useStorage } from "@/hooks/useStorage";
import { FaHome, FaStar } from "react-icons/fa";
import { Link, Outlet } from "react-router";

const HomeLayout = () => {
  const { getJSON } = useStorage();
  return (
    <>
      <header className="flex justify-center">
        <nav className="fixed z-10 bg-white/25 shadow w-full backdrop-blur-md">
          <div className="flex justify-center items-center px-10 py-6">
            <Link to="/">
              <FaHome size={30} />
            </Link>
            <Link to="/favorites" className="ml-4">
              <div className="relative">
                <span className="absolute -top-2 -right-3 text-xs font-bold bg-cyan-500 text-white rounded-full px-1">
                  {getJSON<number[]>("favorites", [])?.length || 0}
                </span>
                <FaStar size={30} className="fill-black" />
              </div>
            </Link>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="mt-20 bg-black">
        <p className="text-center py-5 text-gray-500">
          © {new Date().getFullYear()} Art Gallery - Martin K. & Adrian K.
        </p>
      </footer>
    </>
  );
};

export default HomeLayout;
