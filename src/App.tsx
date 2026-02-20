import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage";
import ArtworkDetailPage from "./pages/ArtworkDetailPage";

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
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
