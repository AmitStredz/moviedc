import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      const data = await res.json();
      setMovie(data);

      const videoRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
      );
      const videoData = await videoRes.json();

      const trailerVideo = videoData.results.find(
        v => v.type === "Trailer" && v.site === "YouTube"
      );

      if (trailerVideo) setTrailer(trailerVideo.key);
    }

    fetchMovie();
  }, [id]);

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-lg text-white">
        Loading movie details...
      </div>
    );
  }

  return (
    <>
      {/* MAIN CARD */}
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
            <h1 className="text-4xl font-bold mb-4">
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

          {/* Buttons */}
          <div className="flex gap-4 flex-wrap mt-8">

            <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold shadow-md">
              ❤️ Add to Wishlist
            </button>

            {trailer && (
              <button
                onClick={() => setShowTrailer(true)}
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition text-white font-semibold shadow-md"
              >
                ▶ Watch Trailer
              </button>
            )}

          </div>

        </div>
      </div>

      {/* TRAILER POPUP */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-black p-4 rounded-xl w-[90%] max-w-3xl relative">

            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-2 right-2 text-white text-xl"
            >
              ✕
            </button>

            <iframe
              className="w-full aspect-video rounded-lg"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Trailer"
              allowFullScreen
            ></iframe>

          </div>
        </div>
      )}
    </>
  );
}