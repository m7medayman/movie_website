export default class MovieCardModel {
  constructor({ id, title, poster_path, vote_average, overview }) {
    this.id = id;
    this.title = title;
    this.poster_path = poster_path;
    this.vote_average = vote_average;
    this.overview = overview;
  }
}
