import { useState, useEffect } from "react";
import { Navigate, Route, Routes,  useNavigate } from "react-router-dom"

import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";


import { apiOptions } from '../utils/utils'
import Api from "../utils/Api"
import authApi from "../utils/authApi";
import CurentUserContext from "../contexts/CurentUserContext"
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup"
import AddPlacePopup from "./AddPlacePopup"
import ConfirmPopup from "./ConfirmPopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [statusInfoTooltip, setStatusInfoTooltip] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [toDeleteCard, setToDeleteCard] = useState(null);
  const [curentUser, setCurentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [api, setApi] = useState(null);

  const navigate = useNavigate();

  function handleSubmit(request) {
    setInProgress(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setInProgress(false))
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleAvatarFormSubmit(inputValues) {
    function makeRequest() {
      return api.editUserAvatar(inputValues).then((userData) => {setCurentUser({...curentUser, avatar: userData.avatar})})
    }

    handleSubmit(makeRequest)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  
  function handleProfileFormSubmit(inputValues) {
    function makeRequest() {
      return api.editUserProfile(inputValues).then(setCurentUser);
    }

    handleSubmit(makeRequest);
  }

  function handleAddPlaceClick(){
    setAddPlacePopupOpen(true);
  }

  function handlePlaceFormSubmit(inputValues) {
    function makeRequest() {
      return api.createCard(inputValues).then((createdCard) => {setCards([createdCard, ...cards])})
    }

    handleSubmit(makeRequest);
  }

  function handleCardClick(card){
    setSelectedCard(card);
  }

  function closeAllPopups(){
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
    setToDeleteCard(null);
    setInProgress(false);
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      authApi.checkToken(jwt)
        .then(({data}) => {
          setLoggedIn(true);
          navigate("/profile", {replace: true});
          return data
        })
        .then((data) => {
          const _api = new Api(apiOptions, jwt)
          Promise.all([_api.getUserPofile(), _api.getAllCards()])
            .then(([profileData, cardsData]) => {
              setCurentUser({...profileData, email: profileData.email});
              setCards(cardsData);
            })
          setApi(_api)
        })
        .catch(console.error)
    };
  }, [loggedIn,])

  function handleCardLike(card) {
    const isLiked = card.likes.some(card => card._id === curentUser._id);

    api.changeLikeStatus(card._id, !isLiked)
      .then((cardData) => {
        setCards((state) => state.map((c) => c._id === card._id ? cardData : c));
      })
      .catch(console.error)
  }

  function handleConfirmCardDelete(card) {
    setToDeleteCard(card);
    setIsConfirmPopupOpen(true);
  }

  function handleDeleteCardFormSubmit() {
    function makeRequest() {
      return api.delCard(toDeleteCard._id)
                .then(() => {
                  setCards((state) => state.filter((c) => c._id !== toDeleteCard._id));
                })
    }

    handleSubmit(makeRequest);
  }

  function handleLoginFormSubmit(values) {
    setInProgress(true);
    authApi.authorize(values)
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        navigate("/", {replace: true});
      })
      .catch(() => {
        setStatusInfoTooltip(false);
        setIsInfoTooltipPopupOpen(true);
      })
      .catch(console.error)
    setInProgress(false);
  }

  function handleRegisterFormSubmit(values) {
    setInProgress(true);
    authApi.register(values)
      .then(() => {
        setStatusInfoTooltip(true);
        setIsInfoTooltipPopupOpen(true);
        navigate("/", {replace: true});
      })
      .catch(() => {
        setStatusInfoTooltip(false);
        setIsInfoTooltipPopupOpen(true);
      })
      .catch(console.error)
    setInProgress(false);
  }

  function handleLogout(e) {
    localStorage.clear();
    setCards([]);
    setCurentUser(null);
    setLoggedIn(false);
  }

  return (
      <div className="page">
        <CurentUserContext.Provider value={curentUser}>
        <Header loggedIn={loggedIn} exit={handleLogout}/>
          <Routes>
            <Route path="/" element={loggedIn ? <Navigate to="/profile" replace/> : <Navigate to="/signin" replace/>}/>
            <Route path="/signin" element={
              <Register inProgress={inProgress} onSubmit={handleRegisterFormSubmit}/>
            }/>
            <Route path="/signup" element={
              <Login inProgress={inProgress} onSubmit={handleLoginFormSubmit}/>
            }/>
            <Route
              path="/profile"
              element={
                <ProtectedRouteElement
                  element={Main}
                  loggedIn={loggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditProfile={handleEditProfileClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleConfirmCardDelete}
                />
              }
            />
          </Routes>
          { loggedIn && <Footer/>}
          <ConfirmPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onSubmit={handleDeleteCardFormSubmit} inProgress={inProgress}></ConfirmPopup>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleAvatarFormSubmit} inProgress={inProgress}></EditAvatarPopup>
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} inProgress={inProgress} onCreateCard={handlePlaceFormSubmit}></AddPlacePopup>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleProfileFormSubmit} inProgress={inProgress}></EditProfilePopup>
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} isSuccess={statusInfoTooltip}/>
        </CurentUserContext.Provider>
      </div>
  );
}

export default App;
