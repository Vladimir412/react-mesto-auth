import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

    function Card({card, onCardClick, onCardLike, onCardDelete}) {

        const currentUser = React.useContext(CurrentUserContext)
        const isOwn = card.owner._id === currentUser._id;
        const cardDeleteButtonClassName = (isOwn ? 'buton-delete' : 'button-delete_hidden')
        const isLiked = card.likes.some(item => item._id === currentUser._id)
        const cardLikeButtonClassName = (isLiked ? 'element__like_active' : 'element__like')


        function handleLikeClick() {
            onCardLike(card)
        }


    function handleCardClick() {
        onCardClick(card);
      } 

      function handleDeleteClick() {
        onCardDelete(card)
      }

    return (
            <article className="element">
                <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}>
                    <div className="buton-delete__image"></div>
                </button>
                <img className="element__photo" src={card.link} alt={card.name} onClick={handleCardClick} />
                <div className="element__info">
                    <h2 className="element__title">{card.name}</h2>
                    <div className="element__like-info">
                        <button className="element__button" type="button" onClick={handleLikeClick}>
                            <div className={cardLikeButtonClassName}></div>
                            <p className="element__counter">{card.likes.length}</p>
                        </button>
                    </div>
                </div>
            </article>
    )
}

export default Card