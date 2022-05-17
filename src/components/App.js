import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import * as auth from "./../utils/Auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [submitTextProfilePopup, setSubmitTextProfilePopup] =
    useState("Сохранить");
  const [submitTextAddPlacesPopup, setSubmitTextAddPlacesPopup] =
    useState("Сохранить");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [message, setMessage] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialData()
        .then(([promis, cards]) => {
          setCurrentUser(promis);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    tokenCheck();
  }, []);

  async function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const res = await auth.validityToken(jwt);
      try {
        if (res) {
          setUserEmail(res.data.email);
        }
        setIsLoggedIn(true);
        history.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  }

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
    setIsInfoTooltip(false);
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
    try {
      await api.deleteCard(card._id);
      setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddPlaceSubmit(data) {
    setSubmitTextAddPlacesPopup("уже почти...");
    try {
      const newCard = await api.setNewCards(data);
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRegister(email, password) {
    try {
      const data = await auth.register(password, email);
      setIsInfoTooltip(true);
      if (data) {
        setMessage(true);
        history.push("/sign-in");
      }
    } catch (error) {
      setMessage(false);
      setIsInfoTooltip(true);
      console.log(error);
    }
  }

  async function handleLogin(email, password) {
    try {
      const data = await auth.login(password, email);
      if (data) {
        setIsLoggedIn(true);
        setUserEmail(email);
        history.push("/");
        localStorage.setItem("jwt", data.token);
      }
    } catch (error) {
      setMessage(false);
      setIsInfoTooltip(true);
    }
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
    setIsLoggedIn(false);
    setUserEmail("");
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={userEmail} onSignOut={handleSignOut} />
        <Switch>
          <ProtectedRoute
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            component={Main}
            exact
            path="/"
            isLoggedIn={isLoggedIn}
          />
          <ProtectedRoute
            component={Footer}
            exact
            path="/"
            isLoggedIn={isLoggedIn}
          />
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>

          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>

          <Route>
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
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

        <ImagePopup
          name="show-cards"
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          name="info-toltip"
          onClose={closeAllPopups}
          isOpen={isInfoTooltip}
          status={message}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
