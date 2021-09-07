import PopupWithForm from './PopupWithForm';
import UncontrolledInputForForm from './UncontrolledInputForForm';
import React from 'react';


function EditAvatarPopup(props) {

    const avatarRef = React.useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onUpdateAvatar({
          avatar: avatarRef.current.value
        })
        avatarRef.current.value = ''
    }

    return (
        <PopupWithForm name={'popup_refresh-avatar'} title={'Обновить аватар'} buttonText={'Сохранить'} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <UncontrolledInputForForm ref={avatarRef} type="url" name="avatar" placeholder="Ссылка на картинку" minLength="2" maxLength="200" hidden={true} required />
        </PopupWithForm>
    )
}

export default EditAvatarPopup