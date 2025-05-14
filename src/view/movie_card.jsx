// MovieCard.js
import React from "react";
const MovieCard = ({ movie }) => (
  <div className="movie-card">
    <img
      src={
        movie.poster_path
          ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
          : "https://via.placeholder.com/240x350?text=No+Image"
      }
      alt={movie.title}
      className="movie-card__img"
    />
    <div className="movie-card__info">
      <h2 className="movie-card__title">{movie.title}</h2>
      <p className="movie-card__overview">{movie.overview}</p>
      <div className="movie-card__rating">
        Rating: <span>{movie.vote_average}</span>
      </div>
    </div>
  </div>
);

export default MovieCard;
