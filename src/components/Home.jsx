import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
        );

        const data = await res.json();
        setMovies(data.results || []);
      } catch {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto text-white bg-slate-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-2">
        Trending Movies <span role="img" aria-label="fire">🔥</span>
      </h1>
      <p className="text-gray-400 mb-8">
        Discover what everyone is watching today
      </p>

      {loading && <p>Loading movies...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <div className="bg-slate-800 p-3 rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition transform cursor-pointer">

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

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;