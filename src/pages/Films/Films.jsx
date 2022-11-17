import React, {useState, useEffect} from "react";
import DataGetCinema from "../../components/DataGetCinema/DataGetCinema";
import {useFetching} from "../../hooks/useFetching";
import FilmList from "../../components/FilmList/FilmList";
import Loader from "../../components/Loader/Loader";
import Tabs from "../../components/Tabs/Tabs";
import './Films.scss'
import MyButton from "../../components/MyButton/MyButton";


const Films = () => {
  const [films, setFilms] = useState([]);

  const count = 6;
  let [countFilmsOnPage, setCountFilmsOnPage] = useState(count);

  const [fetchFilms, isFilmsLoading] = useFetching(async () => {
    const response = await DataGetCinema.getAllFilms();
    setFilms(response.data);
  })

  useEffect(() => {
    fetchFilms()
  }, [])

  let [genre, setGenre] = useState('All')
  let filterFilm
  genre === 'All'
    ? filterFilm = films
    : filterFilm = films.filter(film => (film.genre === genre));

  return (
    <div className="App">

      {isFilmsLoading
        ? <Loader/>
        : <div>
          <Tabs setGenre={setGenre} activeTab={genre}/>
          <FilmList films={filterFilm} countFilmsOnPage={countFilmsOnPage}/>
          {countFilmsOnPage < filterFilm.length &&
          <MyButton onClick={() => setCountFilmsOnPage(countFilmsOnPage + count)}>Load more</MyButton>
          }
        </div>
      }
    </div>
  );
}

export default Films;