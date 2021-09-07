import logoVector from '../images/logo/Vector.svg';


function Header() {
    return (
        <header className="header">
            <img className="logo" src={logoVector} alt="Логотип сайта" />
        </header>
    )
}

    export default Header