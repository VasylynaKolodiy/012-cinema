import axios from "axios";

export default class DataGetCinema {
  static async getAllFilms() {
    const response = await axios.get('https://7.react.pages.academy/wtw/films');
    return response;
  }

  static async getFilmById(id) {
    const responses = await axios.get('https://7.react.pages.academy/wtw/films/' + id);
    return responses;
  }

  static async getFilmByGenre(id) {
    const responses = await axios.get(`https://7.react.pages.academy/wtw/films/${id}/similar`);
    return responses;
  }

  static async getFilmComments(id) {
    const responses = await axios.get('https://7.react.pages.academy/wtw/comments/' + id);
    return responses;
  }

}



