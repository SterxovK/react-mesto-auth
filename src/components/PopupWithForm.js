function PopupWithForm({
  name,
  onClose,
  isOpen,
  title,
  buttonText,
  children,
  onSubmit,
}) {
  return (
    <section className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close button-hover"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form onSubmit={onSubmit} name={name} className="popup__form">
          {children}
          <button
            type="submit"
            className="popup__save-button"
            data-dismiss="modal"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
