import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Comp1 } from "./components/comp1";
import { Comp2 } from "./components/comp2";
import { Comp3 } from "./components/comp3";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  return (
    <BrowserRouter>
      <header className="flex justify-between items-center px-6 py-4 bg-slate-50">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <div className="flex gap-4">
            <SignInButton>
              <button className="py-2 px-4 rounded-md bg-slate-200 border border-white hover:bg-slate-300 hover:text-slate-900 transition ">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="py-2 px-4 rounded-md bg-green-400 border border-white hover:bg-green-300 hover:text-slate-900 transition">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </SignedOut>
      </header>

      <div className="flex flex-col items-center justify-center gap-10 h-screen">
        <div className="flex flex-col items-center">
          <span>Hello World</span>
          <span>This is Moviedc</span>
        </div>
        <nav className="flex gap-5">
          <Link to="/comp1" className="text-blue-500 hover:underline">
            Comp1
          </Link>
          <Link to="/comp2" className="text-blue-500 hover:underline">
            Comp2
          </Link>
          <Link to="/comp3" className="text-blue-500 hover:underline">
            Comp3
          </Link>
        </nav>
        <Routes>
          <Route path="/comp1" element={<Comp1 />} />
          <Route path="/comp2" element={<Comp2 />} />
          <Route path="/comp3" element={<Comp3 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
