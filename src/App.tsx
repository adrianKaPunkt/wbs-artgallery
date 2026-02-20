import { Route, Routes } from "react-router";
import "./App.css";
import { HomePage, ArtworkDetailPage, FavoritePage } from "./pages";
import HomeLayout from "./layout/HomeLayout";

function App() {
  return (
    <>
      <header>
        <nav></nav>
      </header>
      <main>
        <div className="bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/artwork/:id" element={<ArtworkDetailPage />} />
              <Route path="/favorites" element={<FavoritePage />} />
            </Route>
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
