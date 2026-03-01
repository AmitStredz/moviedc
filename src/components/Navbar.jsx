import { useState } from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);
  const { user } = useUser();

  return (
    <nav className="block mx-auto bg-slate-800/70 text-slate-200 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg w-[95%] max-w-6xl">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xl font-bold hover:text-slate-400">
          MovIEDC
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className="hover:text-slate-400">Home</Link>
          <Link to="/movies" className="hover:text-slate-400">Movies</Link>

          <div className="flex items-center gap-4">
            <SignedIn>
              <div className="text-sm font-mono">Hi! {user?.firstName}</div>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <button className="py-2 px-4 rounded bg-blue-100 text-gray-900 hover:bg-blue-200">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton>
                <button className="py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-800">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>

        <button
          onClick={() => setOpenNav(!openNav)}
          className="lg:hidden"
        >
          ☰
        </button>
      </div>

      {openNav && (
        <div className="lg:hidden mt-4 flex flex-col gap-4">
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
        </div>
      )}
    </nav>
  );
}