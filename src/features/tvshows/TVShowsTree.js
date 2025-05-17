import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTVShows } from "./tvshowsSlice";
import TVShowCard from "./TVShowCard";

export default function TVShowsTree() {
    const dispatch = useDispatch();
    const { tvshows, status, error } = useSelector((state) => state.tvshows);

    useEffect(() => {
        dispatch(fetchTVShows());
    }, [dispatch]);

    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed")
        return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Top Rated TV Shows</h2>
            <div className="movie-list">
                {tvshows.map((show) => (
                    <TVShowCard key={show.id} show={show} />
                ))}
            </div>
        </div>
    );
}