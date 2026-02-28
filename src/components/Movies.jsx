import { useEffect, useState } from "react";

function Movies() {

  const [movies, setMovies] = useState([]);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`)

      .then(res => res.json())

      .then(data => setMovies(data.results));

  }, []);

  return (

    <div>

      <h1>Now Playing Movies</h1>

      {movies.map(movie => (

        <p key={movie.id}>{movie.title}</p>

      ))}

    </div>

  );
}

export default Movies;