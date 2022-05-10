import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_type_show-cards ${
        card.link ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_type_show-cards">
        <button
          type="button"
          className="popup__close button-hover"
          onClick={onClose}
        ></button>
        <figure className="popup__show-card">
          <img
            className="popup__image"
            src={card.link}
            alt={`Изображение ${card.name}`}
          />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;
