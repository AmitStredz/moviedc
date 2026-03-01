import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Error loading movie");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p className="p-6">Loading movie...</p>;
  if (!movie) return <p className="p-6">Movie not found</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        className="w-72 rounded shadow"
      />

      {/* Details */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{movie.title}</h1>

        <p className="text-gray-600">{movie.release_date}</p>

        <p className="text-lg">⭐ {movie.vote_average}</p>

        <p className="text-gray-800">{movie.overview}</p>

        {/* Wishlist placeholder */}
        <button className="mt-4 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
          Add to Wishlist
        </button>
      </div>
    </div>
  );
}

export default MovieDetails;