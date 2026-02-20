import { Route, Routes } from "react-router";
import "./App.css";
import { HomePage, ArtworkDetailPage, FavoritePage } from "./pages";

function App() {
  return (
    <>
      <header>
        <nav></nav>
      </header>
      <main>
        <div className="bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/artwork/:id" element={<ArtworkDetailPage />} />
            <Route path="/favorites" element={<FavoritePage />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
