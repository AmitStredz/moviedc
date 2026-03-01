import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

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

  if (!user) return <p>Please sign in</p>;

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
          <div
            key={movie.id}
            className="relative bg-slate-800 p-3 rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition transform"
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg mb-2"
              />
            ) : (
              <div className="h-72 bg-slate-700 rounded-lg flex items-center justify-center">
                No Image
              </div>
            )}

            <h3 className="text-sm font-semibold truncate text-white">
              {movie.title}
            </h3>

            <p className="text-xs text-gray-300">
              ⭐ {movie.vote_average}
            </p>

            {/* Remove Button */}
            <button
              onClick={() => removeFromWishlist(movie.id)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
  );
}