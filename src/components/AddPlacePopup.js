import PopupWithForm from './PopupWithForm';
import ControlledInputForForm from './ControlledInputForForm';
import React from 'react';


function AddPlacePopup(props) {

    const [place, setPlace] = React.useState('');
    const [address, setAddress] = React.useState('')

    function handleChangePlace(e) {
        setPlace(e.target.value)
    }

    function handleChangeAddress(e) {
        setAddress(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        props.onAddPlace({
         name: place,
         link: address
        })
    }

    return (
        <PopupWithForm name={'popup_card'} title={'Новое место'} buttonText={'Создать'} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
        <ControlledInputForForm value={place} onHandleChange={handleChangePlace} type="text" name="name" placeholder="Название" minLength="2" maxLength="30" required />
        <ControlledInputForForm value={address} onHandleChange={handleChangeAddress} type="url" name="link" placeholder="Ссылка на картинку" required />
        </PopupWithForm>
    )
}

export default AddPlacePopup