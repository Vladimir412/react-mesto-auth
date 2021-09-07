import logoClose from '../images/logo/close.svg';

function ImagePopup({card, link, name, onClose}) {
  
    return (
        <div className={card ? 'popup__open popup_image popup' : 'popup'}>
      <div className="show-image">
        <button className="button-close button-close_image" type="button" onClick={onClose}><img className="popup__close" src={logoClose}
            alt="Кнопка закрыти" /></button>
        <img className="show-image__image" src={link} alt={name} />
        <h2 className="show-image__title">{name}</h2>
      </div>
    </div>
    )
}

export default ImagePopup