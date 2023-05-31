import React from "react"

const FormInput = (props) => {
   return (
      <div className="form-group">
         <label htmlFor={props.name}>{props.labelName}</label>
         <input
            className={
               props.errorInfo ? "form-control is-invalid" : "form-control"
            }
            type={props.type}
            name={props.name}
            id={props.name}
            placeholder={`Enter your ${props.labelName}`}
            value={props.value}
            onChange={props.onChange}
         />
         {props.errorInfo && (
            <div className="invalid-feedback">{props.errorInfo}</div>
         )}
      </div>
   )
}

export default FormInput
