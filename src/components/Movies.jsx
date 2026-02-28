import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("popular");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError("");

      let url = "";

      if (query) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
      } else {
        url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      setMovies(data.results || []);
    } catch (err) {
      setError("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [category]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Discover Movies</h1>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-60"
        />

        <button
          onClick={fetchMovies}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="popular">Popular</option>
          <option value="now_playing">Now Playing</option>
          <option value="top_rated">Top Rated</option>
        </select>
      </div>

      {/* States */}
      {loading && <p>Loading movies...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Movie Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <div className="bg-white rounded shadow hover:shadow-lg transition p-2">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded"
                />
              ) : (
                <div className="h-72 bg-gray-200 flex items-center justify-center">
                  No Image
                </div>
              )}

              <p className="mt-2 font-semibold text-sm">
                {movie.title}
              </p>

              <p className="text-xs text-gray-500">
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