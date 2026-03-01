import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const { user } = useUser();
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [id]);

  const handleAdd = (movie) => {
    const stored = JSON.parse(localStorage.getItem(`wishlist_${user.id}`)) || [];

    if (stored.some(m => m.id === movie.id)) {
      setMessage("exists");
      return;
    }

    const updated = [...stored, movie];
    localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updated));

    setMessage("added");
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-lg text-white">
        Loading movie details...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6 bg-slate-900 text-white rounded-2xl shadow-xl flex flex-col md:flex-row gap-8">

      {/* Poster */}
      <div className="flex-shrink-0">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-xl shadow-lg w-full md:w-80"
          />
        ) : (
          <div className="w-full md:w-80 h-[450px] bg-slate-700 rounded-xl flex items-center justify-center">
            No Image
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col justify-between">

        <div>
          <h1 className="text-4xl font-bold mb-4 text-white">
            {movie.title}
          </h1>

          <p className="text-gray-300 mb-6 leading-relaxed max-w-2xl">
            {movie.overview || "No overview available."}
          </p>

          <div className="flex flex-wrap gap-6 text-sm text-gray-400">
            <span>⭐ Rating: {movie.vote_average}</span>
            <span>📅 Release: {movie.release_date}</span>
            <span>🔥 Popularity: {Math.round(movie.popularity)}</span>
          </div>
        </div>

        <button
          onClick={() => handleAdd(movie)}
          className="mt-8 w-fit px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold shadow-md"
        >
          ❤️ Add to Wishlist
        </button>

        {message === "added" && (
          <p className="mt-3 text-green-400 font-medium">
            ✅ Added to wishlist
          </p>
        )}

        {message === "exists" && (
          <p className="mt-3 text-yellow-400 font-medium">
            ⚠️ Already in wishlist
          </p>
        )}

      </div>
    </div>
  );
}