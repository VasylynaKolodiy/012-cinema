import React, {useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import './Header.scss';
import {ReactComponent as Logo} from '../../assets/img/logo.svg';
import logo from '../../assets/img/logo.png';
import {useNavigate} from "react-router";
import MyButton from "../MyButton/MyButton";
import menu from '../../assets/img/menu.png';
// import closeButton from '../../assets/img/closeButton.png';
import closeButton from '../../assets/img/close.svg';


const Header = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));

  function exitUser() {
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload()
  }
  let [openMenu, setOpenMenu] = useState(false)

  return (
    <div className='header'>
      <div className="container header__container">

        <div className="header__logo">
          <Link className="header__logo-link" to="/">
            <img className="header__logo-image" src={logo} alt='Logo'/>
          </Link>
        </div>


        <nav className="header__menu">
          {!user
            ? <ul className="header__menu-list">

              <li className="header__hiddenmenu" onClick={() => !setOpenMenu(!openMenu)}>
                <img src={openMenu ? closeButton : menu } alt='Header menu'/>
              </li>


              <li className="header__menu-item" >
                <Link className="header__menu-item-link" to="/sign-up">
                  Sign Up
                </Link>
              </li>

              <li className="header__menu-item">
                <Link className="header__menu-item-link" to="/sign-in">
                  Sign In
                </Link>
              </li>

              <li className={`header__hiddenmenu-list ${openMenu ? 'active' : ''}`} >
                <p className="header__hiddenmenu-item" >
                  <Link className="header__hiddenmenu-item-link" to="/sign-up" onClick={() => setOpenMenu(!openMenu)}>
                    Sign Up
                  </Link>
                </p>

                <p className="header__hiddenmenu-item" >
                  <Link className="header__hiddenmenu-item-link" to="/sign-in" onClick={() => setOpenMenu(!openMenu)}>
                    Sign In
                  </Link>
                </p>
              </li>


            </ul>
            : <ul className="header__menu-list">

              <li className="header__hiddenmenu" onClick={() => setOpenMenu(!openMenu)}>
                <img src={openMenu ? closeButton : menu } alt='Header menu'/>
              </li>

              <li className="header__menu-item">
                <Link className="header__menu-item-link" to="/favorites">
                  Favorites
                </Link>
              </li>

              <li className="header__menu-item">
                Hello, {JSON.parse(user).displayName}
                <MyButton className="header__menu-item-link exit" to="/films" onClick={() => exitUser()}>
                  Exit
                </MyButton>

              </li>


              <li className={`header__hiddenmenu-list ${openMenu ? 'active' : ''}`} >

                <p className="header__hiddenmenu-itemName">
                  Hello, {JSON.parse(user).displayName}
                </p>
                <p className="header__hiddenmenu-item">
                  <Link className="header__hiddenmenu-item-link" to="/favorites" onClick={() => setOpenMenu(!openMenu)}>
                    Favorites
                  </Link>
                </p>


                <p className="header__hiddenmenu-item">
                  <p className="header__hiddenmenu-item-link exit" to="/films" onClick={() => {exitUser(); setOpenMenu(!openMenu)}}>
                    Exit
                  </p>
                </p>

              </li>


            </ul>


          }

        </nav>

      </div>
    </div>
  );
};

export default Header;