import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMoviesByGenre } from "./moviesSlice";
import MovieCard from "./MovieCard";

const GENRE = "53"; // Thriller

const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, status, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMoviesByGenre(GENRE));
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p style={{ color: "red" }}>{error}</p>;

  return (

    <div >
      <h2 style={{ textAlign: "center" }}>Movies</h2>
      <div className="movie-list">
        {movies && movies.map((movie) => (

          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

    </div>
  );
};

export default MovieList;