import React, {useState} from 'react';
import './WatchVideo.scss'
import {ReactComponent as Close} from '../../assets/img/close.svg';

const WatchVideo = (props) => {
  return (
    <div>
      <div className={`watchvideo__dialog ${props.link ? 'active' : ''}`} >

        <div className="watchvideo__dialog-closeWrapper">
          <a className='watchvideo__dialog-close' onClick={() => props.setEnterWatch('')} >
            <Close className='watchvideo__dialog-closeSvg' />
          </a>
        </div>

        <div className="watchvideo__wrapper">
          <video className='watchvideo__iframe' controls autoPlay >
            <source className="watchvideo__source" src={props.link}/>
          </video>
        </div>


      </div>
    </div>
  );
};

export default WatchVideo;