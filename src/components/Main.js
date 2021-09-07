import React from 'react';
import pictureProfileEdit from '../images/logo/pen.svg';
import pictureAddCard from '../images/logo/plus.svg';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Card from './Card';


function Main(props) {

  const currentUser = React.useContext(CurrentUserContext)
  const cards = props.cards
  const arrCards = cards.map((card) => {
    return <Card key={card.key} id={card.id} card={card} onCardClick={props.onSelectedCard} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
  })
 
    return (
        <main>
        <div className="profile">
              <button className="button-avatar" type="button" onClick={props.onEditAvatar}>
                < img className="profile__avatar" src={currentUser.avatar}  alt="аватар пользователя" />
              </button>
            <div className="profile__info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button className="button-edit" type="button" onClick={props.onEditProfile}>
                <img className="profile__edit" src={pictureProfileEdit}  alt="Редактировать профиль" />
              </button>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button className="button-plus" type="button" onClick={props.onAddPlace}>
              <img className="profile__plus" src={pictureAddCard} alt="Добавить карточку" />
            </button>
        </div>
        <div className="elements">
        {arrCards}
        </div>
      </main>
    )
}

export default Main