


function ControlledInputForForm(props) {

    return (
        <>
        <input value={props.value} onChange={props.onHandleChange} id={`${props.name}-input`} className={`form__input form__input_place ${props.className}`} type={`${props.type}`} name={`${props.name}`} placeholder={`${props.placeholder}`} minLength={`${props.minLength}`} maxLength={`${props.maxLength}`} required />
        <span className={`form__input-error ${props.name}-input-error`}></span>
        </>
    )
}

export default ControlledInputForForm