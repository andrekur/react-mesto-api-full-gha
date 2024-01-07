import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import headerLogo from '../images/logo.svg'

import CurentUserContext from "../contexts/CurentUserContext";


function Header({loggedIn, exit}) {
  const [linkData, setLinkData] = useState(null);
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const curentUser = useContext(CurentUserContext);
  const location = useLocation();
  const path = location.pathname;
  const defaulPath = '/signup';
  const textMap = {
    [defaulPath]: {link: '/signin', text: 'Регистрация'},
    '/signin': {link: '/signup', text: 'Войти'},
    '/profile': {link: '/signup', text: 'Выйти', action: exit}
  };

  function logout(e) {
    if (linkData.action) {
      linkData.action(e)
    }
  }

  useEffect(() => {
    setLinkData(textMap[path] || textMap[defaulPath])
  },[loggedIn, curentUser, location])

  function handleOpenBurgerMenu(e) {
    e.preventDefault()

    if (!burgerMenuOpen) {
      e.target.style.transform = "rotate(90deg)";
    }
    else {
      e.target.style.transform = null;
    }
    
    setBurgerMenuOpen(!burgerMenuOpen);
  }

  return (
    <header className="header">
      { burgerMenuOpen &&
          <ul className="header__burger-menu">
            { curentUser && curentUser.email && (<li><a className="header__burger-item" href="/profile">{curentUser.email}</a></li>)}
            { linkData && (<li><a className="header__burger-item" onClick={logout}  href={linkData.link}>{linkData.text}</a></li>)}
          </ul>
      }
      <div className="header__content">
        <img className="header__logo" src={headerLogo} alt="Лого проекта"/>
        <ul className="header__menu">
        { curentUser && curentUser.email && (<li><a className="header__enter" href="/profile">{curentUser.email}</a></li>)}
        { linkData && (<li><a className="header__enter" onClick={logout}  href={linkData.link}>{linkData.text}</a></li>)}
        </ul>
        <button className="header__burger-button" onClick={handleOpenBurgerMenu}/>
      </div>
    </header>
  )
}

export default Header