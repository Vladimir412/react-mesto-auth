import React from 'react';
import PopupWithForm from './PopupWithForm';
import ControlledInputForForm from './ControlledInputForForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';




function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext)
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')    

    React.useEffect(() => {
      setName(currentUser.name)
      setDescription(currentUser.about)
    }, [currentUser])
  
    function handleChangeName(e) {
            setName(e.target.value)
      }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
      }


    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            firstname: name,
            profession: description
        });
      }

    return(
        <PopupWithForm name={'popup_profile'} title={'Редактировать профиль'} buttonText={'Сохранить'} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
          <ControlledInputForForm value={name} onHandleChange={handleChangeName} type="text" name="firstname" placeholder="Имя" minLength="2" maxLength="40" required />
          <ControlledInputForForm value={description} onHandleChange={handleChangeDescription} type="text" name="profession" placeholder="О себе" minLength="2" maxLength="200" required />
        </PopupWithForm>
    )
}

export default EditProfilePopup