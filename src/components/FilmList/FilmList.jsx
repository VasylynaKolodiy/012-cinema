import React, {useState} from 'react';
import FilmItem from "../FilmItem/FilmItem";
import './FilmList.scss'
import WatchVideo from "../WatchVideo/WatchVideo";


const FilmList = ({films, countFilmsOnPage, setFilterFilm}) => {
  let [enterWatch, setEnterWatch] = useState('')

  let [heartId, setHeartId] = useState((localStorage.getItem('myHeart') && JSON.parse(localStorage.getItem('myHeart'))) || [])


  if (!films.length) {
    return (
      <h1 className='container'>List of films is empty</h1>
    )
  }

  return (
    <div className='films'>
      <div className='container films__container'>
        <div className='film__list'>
          {films.map((film, i) =>
            (i < countFilmsOnPage) && <FilmItem film={film}
                                                setEnterWatch={setEnterWatch}
                                                key={film.id}
                                                heartId={heartId}
                                                setHeartId={setHeartId}
                                                setFilterFilm={setFilterFilm}
                                                films={films}
            />
          )}
        </div>
      </div>

      {(enterWatch) && <WatchVideo link={enterWatch} setEnterWatch={setEnterWatch}/>}

    </div>

  );
};

export default FilmList;