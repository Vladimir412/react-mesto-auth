import logoClose from '../images/logo/close.svg';


  const InfoTooltip = (props) => {

            return (
                <div className={props.isOpen ? `popup popup__open popup_${props.name}` : 'popup'}> 
                    <div className="popup__container">
                        <button className="button-close" type="button"><img className="popup__close" src={logoClose} alt="Кнопка закрытия" onClick={props.onClose} /></button>
                        <img className="info-tooltip__image" src={props.link} alt="Результата регистрации" />
                        <h2 className="popup__title popup__title_type_info-tooltip">{props.title}</h2>
                    </div>
                </div>
            )
}  

export default InfoTooltip