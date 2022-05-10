import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, buttonSubmitText }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="add-cards"
      isOpen={isOpen}
      title="Новое место"
      onClose={onClose}
      buttonText={buttonSubmitText}
      onSubmit={handleSubmit}
    >
      <input
        id="addCardName-input"
        type="text"
        name="name"
        value={name}
        placeholder="Название"
        className="popup__field popup__field_with_card-name"
        minLength="2"
        maxLength="30"
        required
        onChange={handleChangeName}
      />
      <span className="addCardName-input-error popup__field-error"></span>
      <input
        id="addCardUrl-input"
        type="url"
        name="link"
        value={link}
        placeholder="Ссылка на картинку"
        className="popup__field popup__field_with_card-link"
        required
        onChange={handleChangeLink}
      />
      <span className="profileJob-input-error popup__field-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
