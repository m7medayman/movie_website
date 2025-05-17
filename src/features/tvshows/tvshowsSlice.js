import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Put your bearer token here:
const TMDB_BEARER_TOKEN = '16cccc3eabe0ad4c9a9362fe14cfadc6';

export const fetchTVShows = createAsyncThunk(
  'tvshows/fetchTVShows',
  async () => {
    const apiKey = "16cccc3eabe0ad4c9a9362fe14cfadc6";
    const url =
      "https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=200";
    const fullUrl = `${url}&api_key=${apiKey}`;
    const response = await axios.get(fullUrl);
    return response.data.results; // Array of TV shows
  }
);

const tvshowsSlice = createSlice({
  name: 'tvshows',
  initialState: {
    tvshows: [],
    status: 'idle',     // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTVShows.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTVShows.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tvshows = action.payload;
      })
      .addCase(fetchTVShows.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default tvshowsSlice.reducer;