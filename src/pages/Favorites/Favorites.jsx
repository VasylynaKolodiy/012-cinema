import React, {useEffect, useState} from 'react';

import FilmList from "../../components/FilmList/FilmList";
import './Favorites.scss'
import {useFetching} from "../../hooks/useFetching";
import DataGetCinema from "../../components/DataGetCinema/DataGetCinema";
import Loader from "../../components/Loader/Loader";
import {useNavigate} from "react-router-dom";


const Favorites = () => {
  let [filterFilm, setFilterFilm] = useState([])
  let myHeart = (localStorage.getItem('myHeart') && JSON.parse(localStorage.getItem('myHeart'))) || []



  const [fetchFilms, isFilmsLoading] = useFetching(async () => {
    const response = await DataGetCinema.getAllFilms();
    setFilterFilm(response.data.filter(element => myHeart.includes(element.id)))
  })

  const [user, setUser] = useState(localStorage.getItem('user'));

  useEffect(() => {
    fetchFilms()
  }, [])

  let countFilmsOnPage = filterFilm.length
  const navigate = useNavigate();

  console.log(navigate, 'navigate')

  return (
    <div className='favorites'>

      {!user
        ? navigate('/')
        : isFilmsLoading
          ? <Loader/>
          : <div>
            <FilmList films={filterFilm} countFilmsOnPage={countFilmsOnPage} setFilterFilm={setFilterFilm}/>
          </div>
      }
    </div>
  );
};

export default Favorites;