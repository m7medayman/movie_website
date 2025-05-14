// MovieList.js
import { useEffect, useState } from "react";
import { MovieController } from "../controllers/movie_controller";
import MovieCard from "./movie_card";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const movieController = new MovieController();

  useEffect(() => {
    movieController
      .fetchThrillerMovies()
      .then((movies) => {
        setMovies(movies);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error)
    return <p style={{ color: "red" }}>{error.message || String(error)}</p>;

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
