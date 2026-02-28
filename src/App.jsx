import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import { Comp2 } from "./components/comp2";
import { Comp3 } from "./components/comp3";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="bg-gray-900 text-gray-50">
      <BrowserRouter>
        <div className="flex flex-col p-3">
          <Navbar />
        </div>
        <div className="flex flex-col items-center justify-center gap-10 h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/comp2" element={<Comp2 />} />
            <Route path="/comp3" element={<Comp3 />} />
            <Route path="/movies" element={<Movies />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
