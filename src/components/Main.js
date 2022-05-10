import React from "react";
//import api from "../utils/Api";
import Card from "../components/Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__block">
          <img className="profile__avatar" src={currentUser.avatar} alt="#" />
          <button
            className="profile__avatar-edit-button"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__container">
          <div className="profile-intro">
            <h1 className="profile-intro__title">{currentUser.name}</h1>
            <button
              type="button"
              className="profile-intro__edit-button button-hover"
              onClick={onEditProfile}
            />
            <p className="profile-intro__sabtitle">{currentUser.about}</p>
          </div>

          <button
            type="button"
            className="profile__add-button button-hover"
            onClick={onAddPlace}
          />
        </div>
      </section>

      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
