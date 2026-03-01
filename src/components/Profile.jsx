import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

export default function Profile() {
  const { user } = useUser();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!user) return;

    const stored = localStorage.getItem(`wishlist_${user.id}`);
        setWishlist(stored ? JSON.parse(stored) : []);
    }, [user]);

    const removeFromWishlist = (id) => {
    const updated = wishlist.filter((movie) => movie.id !== id);
    setWishlist(updated);
    localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updated));
    };

  return (
    <div className="p-6 max-w-6xl mx-auto text-white bg-slate-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-2">
        {user.firstName}'s Wishlist
      </h1>

      <p className="text-gray-400 mb-6">
        Total Movies: {wishlist.length}
      </p>

      {wishlist.length === 0 ? (
        <div className="flex justify-center items-center h-60">
          <p className="text-gray-500 text-lg">
            Your wishlist is empty.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {wishlist.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              showRemove={true}
              onRemove={removeFromWishlist}
            />
          ))}
        </div>
            )}
    </div>
  );
}
