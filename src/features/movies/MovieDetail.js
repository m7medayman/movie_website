import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
    fetchMovieDetails,
    fetchMovieCast,
} from "./MovieDetailSlice";
 // <-- Import the CSS!

export default function MovieDetail() {
    const { movieId } = useParams();
    const dispatch = useDispatch();

    const {
        details,
        cast,
        status,
        castStatus,
        error,
        castError,
    } = useSelector((state) => state.movieDetail) || {}; // Use fallback!

    useEffect(() => {
        if (movieId) {
            dispatch(fetchMovieDetails(movieId));
            dispatch(fetchMovieCast(movieId));
        }
    }, [dispatch, movieId]);

    if (status === "loading") return <div className="loader">Loading movie...</div>;
    if (status === "failed") return <div className="error">{error}</div>;
    if (!details) return null;

    return (
        <div className="movie-detail-wrapper">
            <h2 className="movie-detail-title">{details.title}</h2>
            <div className="movie-detail-main">
                <img
                    src={
                        details.poster_path
                            ? `https://image.tmdb.org/t/p/w400/${details.poster_path}`
                            : "https://via.placeholder.com/240x350?text=No+Image"
                    }
                    alt={details.title}
                    className="movie-detail-poster"
                />
                <div className="movie-detail-info">
                    <div>
                        <strong>Release date:</strong> {details.release_date}
                    </div>
                    <div>
                        <strong>Rating:</strong> {details.vote_average}
                    </div>
                    <div>
                        <strong>Genres:</strong> {details.genres?.map(g => g.name).join(", ")}
                    </div>
                    <div className="movie-detail-overview">
                        <strong>Overview:</strong>
                        <p>{details.overview}</p>
                    </div>
                </div>
            </div>
            <h3 className="cast-heading">Top Billed Cast</h3>
            {castStatus === "loading" && <div className="loader">Loading cast...</div>}
            {castStatus === "failed" && <div className="error">{castError}</div>}
            <div className="cast-list">
                {cast && cast.map((actor) => (
                    <div key={actor.cast_id} className="cast-card">
                        <img
                            src={
                                actor.profile_path
                                    ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                                    : "https://via.placeholder.com/120x180?text=No+Image"
                            }
                            alt={actor.name}
                            className="cast-card-img"
                        />
                        <div className="cast-card-name">{actor.name}</div>
                        <div className="cast-card-character">{actor.character}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}