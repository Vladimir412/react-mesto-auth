import { forwardRef } from "react"


    const UncontrolledInputForForm = forwardRef ((props, ref) => {
    
        return (
            <>
            <input ref={ref} id={`${props.name}-input`} className="form__input form__input_place" type={`${props.type}`} name={`${props.name}`} placeholder={`${props.placeholder}`} minLength={`${props.minLength}`} maxLength={`${props.maxLength}`} required />
            <span className={`form__input-error ${props.name}-input-error`}></span>
            </>
        )
    }
    )

    export default UncontrolledInputForForm