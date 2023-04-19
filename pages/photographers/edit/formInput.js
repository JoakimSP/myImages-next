import React from 'react'

export default function FormInput(props) {
    const {
        inputName,
        type,
        value
    } = props
  return (
    <div>
        <label htmlFor={inputName}>{inputName}</label>
      <input type={type} name={inputName} value={value} />
      <br />
    </div>
  )
}
