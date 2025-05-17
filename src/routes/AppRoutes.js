import { Routes, Route, Navigate } from "react-router-dom";
import TVShowsTree from "../features/tvshows/TVShowsTree";
import MovieList from "../features/movies/MovieList";
import MovieDetail from "../features/movies/MovieDetail";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movies/:movieId" element={<MovieDetail />} />

            <Route path="/tvshows" element={<TVShowsTree />} />
            <Route path="*" element={<div><h2>404 Not Found</h2></div>} />
        </Routes>
    );
}