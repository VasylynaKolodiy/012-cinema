export default function myToggleHeart(film, heartId, setHeartId, setFilterFilm, films) {
  const newHeartId = heartId.includes(film.id)
    ? heartId.filter(elem => elem !== film.id)
    : [...heartId, film.id];

  setHeartId(newHeartId);
  localStorage.setItem('myHeart', JSON.stringify(newHeartId));
  setFilterFilm && setFilterFilm(films.filter(element => newHeartId.includes(element.id)))
}
