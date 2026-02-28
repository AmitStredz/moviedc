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
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-slate-800 text-slate-200 rounded-md">
      <Link to="/" className="text-xl font-bold">
        MovIEDC
      </Link>

      <div className="flex gap-6">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link to="/Movies" className="hover:text-gray-300">
          Movies
        </Link>
        <Link to="/Comp2" className="hover:text-gray-300">
          Comp2
        </Link>
        <Link to="/Comp3" className="hover:text-gray-300">
          Comp3
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <SignedIn>
          <div className="flex items-center text-sm font-mono">
            Hi! {useUser().user?.firstName}
          </div>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <div className="flex gap-5">
            <SignInButton>
              <button className="py-3 px-4 rounded-md bg-slate-200  hover:bg-slate-300 hover:text-slate-900 transition ">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="py-3 px-4 rounded-md bg-green-400  hover:bg-green-300 hover:text-slate-900 transition">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </SignedOut>
      </div>
    </nav>
  );
}
