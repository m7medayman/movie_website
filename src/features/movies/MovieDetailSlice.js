import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// --- Replace this with your real TMDB Bearer token! ---
const TMDB_BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmNjY2MzZWFiZTBhZDRjOWE5MzYyZmUxNGNmYWRjNiIsIm5iZiI6MTc0NzIwODU5OS4yMTgsInN1YiI6IjY4MjQ0OTk3NTgzNGFlNThmNDVhMzZjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5GPT-UovGvBGQ6LYXdIhKfAfe1psiVjYSgO79LiS07c";

export const fetchMovieDetails = createAsyncThunk(
    "movieDetail/fetchMovieDetails",

    async (movieId) => {
        console.log("fetchMovieDetails");

        const resp = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
            {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
                },
            }
        );
        console.log(resp);
        return resp.data;
    }
);

export const fetchMovieCast = createAsyncThunk(
    "movieDetail/fetchMovieCast",
    async (movieId) => {
        const resp = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
            {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
                },
            }
        );
        // Usually only want the major cast members

        return resp.data.cast.slice(0, 10);
    }
);

const movieDetailSlice = createSlice({
    name: "movieDetail",
    initialState: {
        details: null,
        cast: [],
        status: "idle",
        castStatus: "idle",
        error: null,
        castError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieDetails.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.details = action.payload;
            })
            .addCase(fetchMovieDetails.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchMovieCast.pending, (state) => {
                state.castStatus = "loading";
            })
            .addCase(fetchMovieCast.fulfilled, (state, action) => {
                state.castStatus = "succeeded";
                state.cast = action.payload;
            })
            .addCase(fetchMovieCast.rejected, (state, action) => {
                state.castStatus = "failed";
                state.castError = action.error.message;
            });
    },
});

export default movieDetailSlice.reducer;