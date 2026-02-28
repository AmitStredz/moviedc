import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Comp2 from "./components/Comp2";
import Comp3 from "./components/Comp3";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900 text-white">
        <Navbar />

        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <<Route path="/movies" element={<Movies />} />
            <Route path="/comp2" element={<Comp2 />} />
            <Route path="/comp3" element={<Comp3 />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;