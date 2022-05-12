import React from "react";
import logo from "../images/logo.svg";

function Header() {
   
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Логотип Место" />
        <div className="heaqer__contant">
          <p className="header__user-email">rwef@reger.ru</p>
          <button className="header__button button-hover">tsdfh</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
