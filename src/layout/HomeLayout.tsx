import { FaHome, FaStar } from "react-icons/fa";
import { Link, Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <>
      <header>
        <nav>
          <div className="flex justify-center items-center p-4">
            <Link to="/">
              <FaHome size={24} />
            </Link>
            <Link to="/favorites" className="ml-4">
              <FaStar size={24} />
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
