import axios from "axios";
import MovieCardModel from "../model/movie_model";

export class MovieController {
  targetUrl =
    "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

  constructor() {
    const apiKey = "16cccc3eabe0ad4c9a9362fe14cfadc6";
    this.tmdbAPIWithKey = axios.create({
      baseURL: "https://api.themoviedb.org/3/",
      params: {
        api_key: apiKey,
      },
    });
  }

  async fetchMovies(categoryIds) {
    try {
      const url = `${this.targetUrl}&with_genres=${categoryIds}`;
      const response = await this.tmdbAPIWithKey.get(url);
      console.log(response);
      console.log(response.data.results);
      return response.data.results.map(
        (movie) =>
          new MovieCardModel({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            overview: movie.overview,
          })
      );
    } catch (error) {
      console.log(error);
    }
  }

  async fetchActionMovies() {
    return this.fetchMovies("28");
  }

  async fetchComedyMovies() {
    return this.fetchMovies("35");
  }

  async fetchHorrorMovies() {
    return this.fetchMovies("27");
  }

  async fetchRomanceMovies() {
    // Romance genre ID: 10749
    return this.fetchMovies("10749");
  }

  async fetchThrillerMovies() {
    return this.fetchMovies("53");
  }
}
