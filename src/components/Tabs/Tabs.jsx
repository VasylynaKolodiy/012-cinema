import React from 'react';
import "./Tabs.scss"
import MyButton from "../MyButton/MyButton";

const Tabs = (props) => {
  let arrayGenre = ['All', 'Action', 'Crime', 'Adventure', 'Drama', 'Thriller', 'Comedy', 'Fantasy']

  return (
    <div className="tabs">
      <ul className="tabs__list container">
        {arrayGenre.map((gnr, i) =>
          <li className="tabs__list-item" key={i}>
            <MyButton className={`tabs__list-button ${props.activeTab === gnr ? 'active' : ''}`} onClick={() => props.setGenre(gnr)}>{gnr}</MyButton>
          </li>
          )
        }
      </ul>
    </div>
  );
};

export default Tabs;