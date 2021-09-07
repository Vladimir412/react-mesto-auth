import Header from './Header'
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import React from 'react';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup  from './EditProfilePopup';
import EditAvatarPopup  from './EditAvatarPopup';
import AddPlacePopup  from './AddPlacePopup';


 export function App() {


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

  const [selectedCard, setSelectedCard] = React.useState(null)
  function handleCardClick (card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
  }

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


    return (
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick} 
          onSelectedCard={handleCardClick} 
          cards={cards} 
          onCardLike={handleCardLike} 
          onCardDelete={handleCardDelete}
         />
        <Footer />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <PopupWithForm name={'popup_confirm'} title={'Вы уверены&quest;'} buttonText={'Да'} />
        <ImagePopup card={selectedCard} {...selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    )
  }
