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
    <nav className="block mx-auto bg-slate-800/50 text-slate-200 px-6 py-3 sticky top-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg w-[95%] max-w-6xl">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xl font-bold hover:text-slate-300">
          MovIEDC
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className="hover:text-slate-300">
            Home
          </Link>
          <Link to="/movies" className="hover:text-slate-300">
            Movies
          </Link>
          <Link to="/profile" className="hover:text-slate-300">
            Profile
          </Link>

          <div className="flex items-center gap-4">
            <SignedIn>
              <div className="text-sm font-mono">Hi! {user?.firstName}</div>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <button className="py-2 px-4 rounded-2xl bg-blue-100 text-gray-950 hover:bg-blue-200 hover:text-gray-900 transition">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton>
                <button className="py-2 px-4 rounded-2xl bg-blue-600 text-gray-50 hover:bg-blue-800 hover:text-gray-200 transition">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>

        <button
          onClick={() => setOpenNav(!openNav)}
          className="lg:hidden relative h-6 w-6 text-inherit"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {openNav ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </span>
        </button>
      </div>

      {openNav && (
        <div className="lg:hidden mt-4 flex flex-col gap-4">
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/profile" className="hover:text-slate-300">
            Profile
          </Link>

          <div className="flex flex-col gap-3 mt-2">
            <SignedIn>
              <div className="flex items-center justify-between text-sm font-mono">
                Hi! {user?.firstName}
                <UserButton />
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <button className="py-3 px-4 rounded-2xl bg-blue-100 text-gray-950 hover:bg-blue-300 hover:text-gray-900 transition">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="py-3 px-4 rounded-2xl bg-blue-600 text-gray-50 hover:bg-blue-800 hover:text-gray-200 transition">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
}
