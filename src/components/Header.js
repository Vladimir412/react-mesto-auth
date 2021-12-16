import logoVector from '../images/logo/Vector.svg';

function Header(props) {

    return (
        <header className="header">
            <img className="logo" src={logoVector} alt="Логотип сайта" />
            <div className="header__container">
                {props.exit}
                {props.email}
                {props.entrance}
                {props.register}
            </div>
        </header>
    )
}

    export default Header
