import React from "react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

function Header({ email, onSignOut }) {
  const location = useLocation();
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Логотип Место" />
        <div className="heaqer__contant">
          <p className="header__user-email">{email}</p>
          <Link
            to={
              location.pathname === "/sign-up"
                ? "/sign-in"
                : location.pathname === "/sign-in"
                ? "/sign-up"
                : "/sign-in"
            }
            className="header__button button-hover"
            onClick={location.pathname === "/" ? onSignOut : () => {}}
          >
            {location.pathname === "/sign-up"
              ? "Войти"
              : location.pathname === "/sign-in"
              ? "Регистрация"
              : "Выйти"}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;