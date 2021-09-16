import logoVector from '../images/logo/Vector.svg';
// import { Link, NavLink, useHistory, } from 'react-router-dom';


function Header(props) {

    // const history = useHistory()

    // const liginOut = () => {
    //     localStorage.removeItem('jwt');
    //     history.push('/login')
    // }

    return (
        <header className="header">
            <img className="logo" src={logoVector} alt="Логотип сайта" />
            <div className="header__container">
                {/* <nav className="header__links"> */}
                {props.exit}
                {props.email}
                {props.entrance}
                {props.register}
                        {/* <Link to="/register" className="header__link">Регистрация</Link>
                        <Link to="/login" className="header__link" >Войти</Link>
                        <Link onClick={liginOut} to="/login" className="header__link" >Выйти</Link> */}
                   
                {/* </nav> */}
            </div>
        </header>
    )
}

    export default Header
