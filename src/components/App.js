import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import * as auth from "./../utils/Auth"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [submitTextProfilePopup, setSubmitTextProfilePopup] =
    React.useState("Сохранить");
  const [submitTextAddPlacesPopup, setSubmitTextAddPlacesPopup] =
    React.useState("Сохранить");
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [newUserInfo, setNewUserInfo] = React.useState({});

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

  //ОТПРАВИТЬ ПОСТ НА ДОБАВЛЕНИЕ НОВОГО ПОЛЬЗОВАТЕЛЯ
  function handleRegister(  password, email ) {
    console.log(password, email);
    auth.register(password, email);
    

    //setNewUserInfo({email});
  }
  function handleLogin(data) {
   
    //setLoggedIn(true)
  }
  function handleSignOut() {
    //console.log('нажал на выйти')
  }

  //ПРидумать логикику текста кнопки в хедере
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          isLoggedIn={isLoggedIn}
          email={newUserInfo.userEmail}
          onSignOut={handleSignOut}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            isLoggedIn={isLoggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>

          <Route>
            <Redirect to={!isLoggedIn ? "/sign-in" : "/"} />
          </Route>
        </Switch>

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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
