import React from "react";

const TVShowCard = ({ show }) => (
  <div className="movie-card">
    <img
      src={
        show.poster_path
          ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
          : "https://via.placeholder.com/240x350?text=No+Image"
      }
      alt={show.name}
      className="movie-card__img"
    />
    <div className="movie-card__info">
      <h2 className="movie-card__title">{show.name}</h2>
      <p className="movie-card__overview">{show.overview}</p>
      <div className="movie-card__rating">
        Rating: <span>{show.vote_average}</span>
      </div>
      <div className="movie-card__air-date">
        First Air Date: <span>{show.first_air_date}</span>
      </div>
    </div>
  </div>
);

export default TVShowCard;