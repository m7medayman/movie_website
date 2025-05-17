import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// You can fetch by genre using this thunk, analogous to your controller methods:
export const fetchMoviesByGenre = createAsyncThunk(
  "movies/fetchByGenre",
  async (genreId) => {
    const apiKey = "16cccc3eabe0ad4c9a9362fe14cfadc6";
    const url =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
    const fullUrl = `${url}&with_genres=${genreId}&api_key=${apiKey}`;
    const response = await axios.get(fullUrl);
    // If you want, transform here (no need for class models in Redux)
    return response.data.results;
  }
);

const initialState = {
  movies: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;