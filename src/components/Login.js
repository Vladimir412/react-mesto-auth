import ControlledInputForForm from "./ControlledInputForForm"
import { useState } from "react"


const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onHandleChangeInputEmail = (e) => {
        setEmail(e.target.value)
    }

    const onHandleChangeInputPassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onLogin(email, password)
                setEmail('')
                setPassword('')
    }

    return (
        <div className="login-signup">
            <div className="login-signup__conatainer">
                <h2 className="login-signup__title">Вход</h2>
                <form className="form form_registr" onSubmit={handleSubmit}>
                    <ControlledInputForForm value={email} onHandleChange={onHandleChangeInputEmail} className="form__input_type_registr" name="email" type="text" placeholder="Email" />
                    <ControlledInputForForm value={password} onHandleChange={onHandleChangeInputPassword} className="form__input_type_registr" name="password" type="password" placeholder="Пароль" />
                    <button className="form__button form__button_register" type="submit" >Войти</button>
                </form>
            </div>
        </div>
    )
}

export default Login