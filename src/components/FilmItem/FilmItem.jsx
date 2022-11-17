import React, {useState} from "react";
import {Link} from 'react-router-dom';
import './FilmItem.scss';
import {ReactComponent as Play} from "../../assets/img/play.svg";
import {ReactComponent as Info} from "../../assets/img/info.svg";
import {ReactComponent as Heart} from "../../assets/img/heart.svg";
import myToggleHeart from "../../helpers";


function FilmItem(props) {

  const [user, setUser] = useState(localStorage.getItem('user'));

  return (

    <div className="film__item">
      <div className="film__item-posterWrapper">
        <img className='film__item-poster' src={props.film.background_image} alt='Film image'/>
      </div>


      {user &&
        <div
          className={`film__item-heart ${props.heartId.includes(props.film.id) ? 'active' : ''}`}
          onClick={() => myToggleHeart(props.film, props.heartId, props.setHeartId, props.setFilterFilm, props.films)}>
          <Heart className='film__item-heartSVG'/>
        </div>
      }


      <Link className="film__item-link" to={`/films/${props.film.id}`}>
        <h4 className="film__item-name">
          {props.film.name}
        </h4>
      </Link>

      <div className="film__overflow">
        <div className="film__watch">
          <a className="film__item-watchLink" onClick={() => props.setEnterWatch(props.film.preview_video_link)}>
            <Play className="film__item-watchIcon"/>
            <p className="film__item-watchText">
              Watch Trailer
            </p>
          </a>

          <a className="film__item-watchLink" onClick={() => props.setEnterWatch(props.film.video_link)}>
            <Play className="film__item-watchIcon"/>
            <h4 className="film__item-watchText">
              Watch Film
            </h4>
          </a>

          <Link className="film__item-watchLink" to={`/films/${props.film.id}`}>
            <Info className="film__item-watchIcon"/>
            <h4 className="film__item-watchText">
              Read More
            </h4>
          </Link>


        </div>


      </div>


    </div>

  )
}

export default FilmItem