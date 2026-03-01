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
  const { user } = useUser();   // FIXED: store user here

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-slate-800 text-slate-200 rounded-md">
      <Link to="/" className="text-xl font-bold">
        MovIEDC
      </Link>

      <div className="flex gap-6">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/movies" className="hover:text-gray-300">Movies</Link>
      </div>

      <div className="flex items-center gap-4">
        <SignedIn>
          <div className="flex items-center text-sm font-mono">
            Hi! {user?.firstName}
          </div>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <div className="flex gap-5">
            <SignInButton>
              <button className="py-3 px-4 rounded-md bg-slate-200 text-slate-900 hover:bg-slate-300 transition">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton>
              <button className="py-2 px-4 rounded-md bg-green-400 hover:bg-green-300 hover:text-slate-900 transition">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </SignedOut>
      </div>
    </nav>
  );
}