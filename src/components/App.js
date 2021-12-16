/* eslint-disable react-hooks/exhaustive-deps */
import Header from './Header'
import { Redirect, Route, Switch, useHistory, Link } from 'react-router-dom';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import React, { useEffect } from 'react';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup  from './EditProfilePopup';
import EditAvatarPopup  from './EditAvatarPopup';
import AddPlacePopup  from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import * as apiAuth from '../utils/apiAuth';
import { ProtectedRoute } from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import disaster from '../images/disaster.png';
import success from '../images/success.png'



 export function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const handleIsLoggedIn = () => {
    setIsLoggedIn(true)
  }
  
  const history = useHistory()

  const [dataUserForHomePage, setDataUserForHomePage] = React.useState({id:'', email:''})

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt')
      apiAuth.getDataUser(token)
      .then(res => {
        if (res) {
          handleIsLoggedIn(true)
          setDataUserForHomePage({
            id: res.data._id,
            email: res.data.email
          })
          history.push('/main')
        }
      })
      .catch(err => console.log(err))
    }
  }

  React.useEffect(() => {
    tokenCheck()
  }, [isLoggedIn])

  const [currentUser, setCurrentUser] = React.useState({name: "", about: ""})

  React.useEffect(() => {
    api.getInfoAboutUser()
    .then((data) => {
      setCurrentUser(data)
    })
    .catch(res => console.log(res))
  }, [])

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  const [isSuccessInfoRegister, setIsSuccessInfoRegister] = React.useState(false)
  function handleSuccessInfoRegister() {
    setIsSuccessInfoRegister(true)
  }

  const [isDisasterInfoRegister, setIsDisasterInfoRegister] = React.useState(false)
  function handleDisasterInfoRegister() {
    setIsDisasterInfoRegister(true)
  }

  function handleRegister(email, password) {
        apiAuth.register(email, password)
        .then(res => {
            if (res) {
              handleSuccessInfoRegister(true);
                history.push('/login');
            } 
        })
        .catch(err => {
          handleDisasterInfoRegister(true)
          console.log(err)
        })
  }

  function handleLogin(email, password) {
    apiAuth.login(email, password)
    .then((res) => {
        if (res) {
            localStorage.setItem('jwt', res.token);
            handleIsLoggedIn(true)
            history.push('/main')
        }
    })
    .catch(err => console.log(err))
  }

  const [selectedCard, setSelectedCard] = React.useState(null)
  function handleCardClick (card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
    setIsSuccessInfoRegister(false)
    setIsDisasterInfoRegister(false)
  }

  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups()
      }
    }
    document.addEventListener('keydown', closeOnEscape);
      
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
    }
      
    
  }, [])

  const [cards, setCards] = React.useState([])


  React.useEffect(() => {
    api.getInitialCards()
    .then((data) => {
      const arrCards = data.map((card) => {
        return {
          key: card._id,
          id: card._id,
          name: card.name,
          link: card.link,
          length: card.likes.length,
          owner: card.owner,
          likes: card.likes
        }
      })
      setCards(arrCards)
    })
    .catch(err => console.log(err))
  }, [])


  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.updateLikes(isLiked, card.id)
    .then((newCard) => {
      newCard.key = card.id
      newCard.id = card.id
      setCards((state) => {
        return state.map(c => c.id === card.id ? newCard : c)
      })
    })
    .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card.id)
    .then((data) => {
      setCards((state) => {
        return state.filter(j => j.id !== card.id && data)
      })
    })
    .catch(res => console.log(res))
  }
  
  function handleUpdateUser(dataPopup) {
    api.editUserProfile(dataPopup)
    .then((data) => {
     setCurrentUser(data)
     closeAllPopups()
    })
    .catch(res => console.log(res))
  }

  function handleUpdateAvatar(dataPopup) {
    api.editAvatar(dataPopup)
    .then((data) => {
      setCurrentUser(data)
     closeAllPopups()
    })
    .catch(res => console.log(res))
  }

  function handleAddPlaceSubmit(data) {
    api.sentNewCard(data)
    .then((newCard) => {
      newCard.key = newCard._id
      newCard.id = newCard._id
      setCards([newCard, ...cards])
      closeAllPopups()
    })
    .catch(res => console.log(res))
  }

  const liginOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false)
    history.push('/login')
}


    return (
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/main">
            <Header
              email={<p className="header__link">{dataUserForHomePage.email}</p>}
              exit={<Link onClick={liginOut} to="/login" className="header__link" >Выйти</Link>}
            />
          </Route>
        </Switch> 
        <Switch>
        <Route path="/login">
          <Header register={<Link to="/register" className="header__link">Регистрация</Link>}/>
          <Login onLogin={handleLogin} loggedIn={isLoggedIn} />
        </Route>  
        <Route path="/register">
          <Header entrance={<Link to="/login" className="header__link" >Войти</Link>}/>
            <Register loggedIn={isLoggedIn} onRegister={handleRegister} />
          </Route>  
        <ProtectedRoute path="/main"
          component={Main}
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick} 
          onSelectedCard={handleCardClick} 
          cards={cards} 
          onCardLike={handleCardLike} 
          onCardDelete={handleCardDelete}
          loggedIn={isLoggedIn}
          />  
          <Route exact path="/">
            {isLoggedIn ? <Redirect to="/main" /> : <Redirect to="/login" />}
          </Route>
          </Switch>
        <Footer />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <PopupWithForm name={'popup_confirm'} title={'Вы уверены&quest;'} buttonText={'Да'} />
        <ImagePopup card={selectedCard} {...selectedCard} onClose={closeAllPopups} />
        <InfoTooltip title="Вы успешно зарегистрировались!" link={success} name="info-tooltip" isOpen={isSuccessInfoRegister} onClose={closeAllPopups} />
        <InfoTooltip title="Что-то пошло не так! Попробуйте ещё раз." link={disaster} name="info-tooltip" isOpen={isDisasterInfoRegister} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    )
  }
