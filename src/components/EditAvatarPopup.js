import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef(null);

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      isOpen={isOpen}
      title="Обновить аватар"
      onClose={onClose}
      buttonText="Да"
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-link"
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        className="popup__field"
        required
        ref={avatarRef}
      />
      <span className="avatar-link-error popup__field-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
