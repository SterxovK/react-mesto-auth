import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [submitTextProfilePopup, setSubmitTextProfilePopup] = React.useState("Сохранить");
  const [submitTextAddPlacesPopup, setSubmitTextAddPlacesPopup] = React.useState("Сохранить");

  React.useEffect(() => {
    api
      .getInitialData()
      .then(([promis, cards]) => {
        setCurrentUser(promis);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditProfileClick = () => {
    setSubmitTextProfilePopup("Сохранить");
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setSubmitTextAddPlacesPopup("Сохранить");
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  };

  const handleUpdateUser = (data) => {
    setSubmitTextProfilePopup("Сохранение...");
    api
      .setUserInfo(data)
      .then((promis) => {
        setCurrentUser(promis);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (data) => {
    api
      .setUserAvatar(data)
      .then((promis) => {
        setCurrentUser(promis);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //КАРТОЧКА
  async function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const action = isLiked ? api.deleteLikes(card._id) : api.setLikes(card._id);
    try {
      const newCard = await action;
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    } catch (error) {
      console.log(error);
    }
  }
  async function handleCardDelete(card) {
    await api.deleteCard(card._id);
    try {
      setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddPlaceSubmit(data) {
    setSubmitTextAddPlacesPopup("уже почти...");
    const newCard = await api.setNewCards(data);
    try {
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonSubmitText={submitTextProfilePopup}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonSubmitText={submitTextAddPlacesPopup}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <Footer />
        <ImagePopup
          name="show-cards"
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
