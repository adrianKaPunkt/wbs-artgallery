import { useStorage } from "@/hooks/useStorage";
import { FaHome, FaStar } from "react-icons/fa";
import { Link, Outlet } from "react-router";

const HomeLayout = () => {
  const { getJSON } = useStorage();
  return (
    <>
      <header>
        <nav>
          <div className="flex justify-center items-center p-4">
            <Link to="/">
              <FaHome size={50} />
            </Link>
            <Link to="/favorites" className="ml-4">
              <div className="relative">
                <span className="absolute -top-2 -right-5 bg-cyan-500 text-white rounded-full px-3">
                  {getJSON<number[]>("favorites", [])?.length || 0}
                </span>
                <FaStar size={50} className="fill-yellow-400" />
              </div>
            </Link>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default HomeLayout;
