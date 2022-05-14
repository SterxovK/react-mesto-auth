import React from "react";
import logo from "../images/logo.svg";
import {Link} from 'react-router-dom'

function Header({ email, isLoggedIn, handleSignOut }) {
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Логотип Место" />
        <div className="heaqer__contant">
          <p className="header__user-email">{email}</p>
          {!isLoggedIn && (
            <Link to="/sign-up" className="header__button button-hover">
              Войти
            </Link>
          )}
          {isLoggedIn && (
            <button
              onClick={handleSignOut}
              className="header__button button-hover"
            >
              Выйти
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
