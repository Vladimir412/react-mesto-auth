import logoClose from '../images/logo/close.svg';


function PopupWithForm(props) {
    return (
        <div className={props.isOpen ? `popup popup__open popup_${props.name}` : 'popup'}>
      <div className="popup__container">
        <button className="button-close" type="button"><img className="popup__close" src={logoClose} alt="Кнопка закрытия" onClick={props.onClose} /></button>
        <h2 className="popup__title">{props.title}</h2>
        <form onSubmit={props.onSubmit} className="form" name={`${props.name}`}>
          {props.children}
          <button className="form__button" type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
    )
}

export default PopupWithForm