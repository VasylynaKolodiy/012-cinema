import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useFetching} from "../../hooks/useFetching";
import DataGetCinema from "../../components/DataGetCinema/DataGetCinema";
import Loader from "../../components/Loader/Loader";
import './FilmIdPage.scss'
import WatchVideo from "../../components/WatchVideo/WatchVideo";
import MyButton from "../../components/MyButton/MyButton";
import {ReactComponent as Heart} from "../../assets/img/heart.svg";
import CommentItem from "../../components/CommentItem/CommentItem";
import FilmList from "../../components/FilmList/FilmList";
import myToggleHeart from "../../helpers";

const FilmIdPage = () => {
  const params = useParams();
  const [film, setFilm] = useState([]);
  const [fetchFilmById, isLoading, error] = useFetching(async (id) => {
    const response = await DataGetCinema.getFilmById(params.id);
    setFilm(response.data);
  });


  const [films, setFilms] = useState([]);
  const [fetchFilms] = useFetching(async () => {
    const response = await DataGetCinema.getFilmByGenre(params.id);
    setFilms(response.data);
  })

  const [comments, setComments] = useState([]);
  const [fetchCommentById] = useFetching(async (id) => {
    const response = await DataGetCinema.getFilmComments(params.id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchFilmById(params.id);
    fetchCommentById(params.id);
    setHeartId((localStorage.getItem('myHeart') && JSON.parse(localStorage.getItem('myHeart'))) || [])
  }, [params.id])

  useEffect(() => {
    fetchFilms()
  }, [])

  let [enterWatch, setEnterWatch] = useState('')
  let filmsByGenre = films.filter(film => Number(film.id) !== Number(params.id))

  let [heartId, setHeartId] = useState((localStorage.getItem('myHeart') && JSON.parse(localStorage.getItem('myHeart'))) || [])

  const [user, setUser] = useState(localStorage.getItem('user'));

  return (
    <div className='filmPage'>
      <div className='filmPage__container container'>
        {isLoading
          ? <Loader/>
          : <div className='filmPage__content'>

            <div className='filmPage__leftPart'>
              <div className='filmPage__poster'>
                <img className='filmPage__poster-img' src={film.poster_image} alt='Film image'/>
              </div>

              {user &&
                <div
                  className={`film__item-bigHeart ${heartId.includes(film.id) ? 'active' : ''}`}
                  onClick={() => myToggleHeart(film, heartId, setHeartId, films)}>
                  <Heart className='film__item-bigHeartSVG'/>
                </div>
              }

              <div className='filmPage__poster-buttons'>
                <MyButton onClick={() => setEnterWatch(film.preview_video_link)}>
                  Watch trailer</MyButton>

                <MyButton onClick={() => setEnterWatch(film.video_link)}>
                  Watch film</MyButton>
              </div>
            </div>

            <div className='filmPage__info'>
              <h1 className='filmPage__name'>{film.name}</h1>
              <ul className='filmPage__list table'>
                <li>
                  <span>Director: </span>{film.director}
                </li>
                <li>
                  <span>Genre: </span>{film.genre}
                </li>
                <li>
                  <span>Rating: </span>{film.rating}
                </li>
                <li>
                  <span>Released: </span>{film.released}
                </li>
                <li>
                  <span>Run time: </span>{film.run_time} min
                </li>
              </ul>

              <ul className='filmPage__list'>
                <li>
                  <span>Starring: </span> {film.starring?.join(', ')}
                </li>
                <li>
                  <span>Description: </span>{film.description} {film.description}
                </li>
                <li>
                  <span>Description: </span>{film.description}
                  <p>
                    {film.description}
                  </p>
                  <p>
                    {film.description} {film.description}
                  </p>
                  <br/>
                  <p>
                    {film.description} {film.description} {film.description}
                  </p>
                  <br/>
                  <p>
                    {film.description}
                  </p>
                  <p>
                    {film.description} {film.description}
                  </p>
                  <br/>
                  <p>
                    {film.description} {film.description} {film.description}
                  </p>
                  <br/>
                  <p>
                    {film.description}
                  </p>
                  <p>
                    {film.description} {film.description}
                  </p>
                  <br/>
                  <p>
                    {film.description} {film.description} {film.description}
                  </p>
                </li>
              </ul>
              {(enterWatch) && <WatchVideo link={enterWatch} setEnterWatch={setEnterWatch}/>}
              <CommentItem comments={comments}/>
              <h2>See also:</h2>
              <FilmList films={filmsByGenre} countFilmsOnPage={filmsByGenre.length}/>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default FilmIdPage;