import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/movies/moviesSlice";
import tvshowsReducer from "../features/tvshows/tvshowsSlice";
import movieDetailReducer from "../features/movies/MovieDetailSlice";
export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    tvshows: tvshowsReducer,
    movieDetail: movieDetailReducer,

  }
});