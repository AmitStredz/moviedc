import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;