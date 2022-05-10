import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonSubmitText }) {
  const [name, setName] = React.useState(" ");
  const [description, setDescription] = React.useState(" ");
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      isOpen={isOpen}
      title="Редактировать профиль"
      onClose={onClose}
      buttonText={buttonSubmitText}
      onSubmit={handleSubmit}
    >
      <input
        id="profileName-input"
        type="text"
        name="name"
        placeholder="Имя"
        className="popup__field popup__field_with_name"
        minLength="2"
        maxLength="30"
        value={name || ""}
        onChange={handleChangeName}
        required
      />
      <span className="profileName-input-error popup__field-error"></span>
      <input
        id="profileJob-input"
        type="text"
        name="about"
        placeholder="Статус"
        className="popup__field popup__field_with_job"
        minLength="2"
        maxLength="30"
        value={description || ""}
        onChange={handleChangeDescription}
        required
      />
      <span className="profileJob-input-error popup__field-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
